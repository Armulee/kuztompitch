"use client"

import { useEffect, useState } from "react"

/**
 * On-screen timing readout for debugging on a real phone, where DevTools is
 * not available. Renders only when the URL carries ?perf=1, so it costs
 * normal visitors nothing but the mount check.
 */

type Row = { label: string; value: string; warn?: boolean }

const ms = (n: number | undefined) =>
    n === undefined || n < 0 ? "—" : `${Math.round(n)} ms`

const PerfOverlay = () => {
    const [enabled, setEnabled] = useState(false)
    const [rows, setRows] = useState<Row[]>([])
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!new URLSearchParams(window.location.search).has("perf")) return
        setEnabled(true)

        const paint: Record<string, number> = {}
        let lcp = 0
        const longTasks: number[] = []

        const observe = (type: string, cb: (e: PerformanceEntry) => void) => {
            try {
                const o = new PerformanceObserver((l) =>
                    l.getEntries().forEach(cb),
                )
                o.observe({ type, buffered: true })
                return o
            } catch {
                return null
            }
        }

        const observers = [
            observe("paint", (e) => {
                paint[e.name] = e.startTime
            }),
            observe("largest-contentful-paint", (e) => {
                lcp = e.startTime
            }),
            observe("longtask", (e) => {
                longTasks.push(e.duration)
            }),
        ]

        const collect = () => {
            const nav = performance.getEntriesByType(
                "navigation",
            )[0] as PerformanceNavigationTiming | undefined

            const res = performance.getEntriesByType(
                "resource",
            ) as PerformanceResourceTiming[]

            const api = res.find((r) => r.name.includes("/api/ig-posts"))
            const fonts = res.filter((r) => /\.(woff2?|ttf)/.test(r.name))
            const video = res.find((r) => r.name.includes("hero.webm"))

            // time the main thread was blocked past the 50ms responsiveness budget
            const tbt = longTasks.reduce((a, d) => a + Math.max(0, d - 50), 0)

            const bytes = res.reduce((a, r) => a + (r.transferSize || 0), 0)

            const conn = (
                navigator as Navigator & {
                    connection?: { effectiveType?: string; saveData?: boolean }
                }
            ).connection

            setRows([
                { label: "เน็ต", value: conn?.effectiveType ?? "ไม่รู้" },
                {
                    label: "CPU cores",
                    value: String(navigator.hardwareConcurrency ?? "?"),
                },
                { label: "TTFB", value: ms(nav?.responseStart) },
                {
                    label: "ข้อความแรกขึ้น",
                    value: ms(paint["first-contentful-paint"]),
                    warn: (paint["first-contentful-paint"] ?? 0) > 1800,
                },
                {
                    label: "ภาพใหญ่สุดขึ้น",
                    value: ms(lcp),
                    warn: lcp > 2500,
                },
                {
                    label: "จอค้าง กดไม่ได้",
                    value: ms(tbt),
                    warn: tbt > 300,
                },
                {
                    label: "งานหนัก >50ms",
                    value: `${longTasks.length} ครั้ง`,
                    warn: longTasks.length > 5,
                },
                { label: "load เสร็จ", value: ms(nav?.loadEventEnd) },
                {
                    label: "API ฟีด IG",
                    value: api ? ms(api.duration) : "ยังไม่ถูกเรียก",
                    warn: (api?.duration ?? 0) > 1500,
                },
                {
                    label: "ฟอนต์",
                    value: `${fonts.length} ไฟล์ · ช้าสุด ${ms(
                        Math.max(0, ...fonts.map((f) => f.duration)),
                    )}`,
                },
                {
                    label: "วิดีโอ hero",
                    value: video
                        ? `${Math.round((video.transferSize || 0) / 1024)} KB`
                        : "ข้าม (เน็ตช้า)",
                },
                {
                    label: "โหลดรวม",
                    value: `${Math.round(bytes / 1024)} KB · ${res.length} requests`,
                },
            ])
        }

        // let the late stuff (video, IG fetch) land before reading the numbers
        const t1 = window.setTimeout(collect, 3000)
        const t2 = window.setTimeout(collect, 9000)

        return () => {
            observers.forEach((o) => o?.disconnect())
            window.clearTimeout(t1)
            window.clearTimeout(t2)
        }
    }, [])

    if (!enabled) return null

    const copy = () => {
        const text = rows.map((r) => `${r.label}: ${r.value}`).join("\n")
        navigator.clipboard?.writeText(text).then(
            () => {
                setCopied(true)
                window.setTimeout(() => setCopied(false), 1500)
            },
            () => {},
        )
    }

    return (
        <div
            style={{
                position: "fixed",
                left: 8,
                right: 8,
                bottom: "calc(8px + env(safe-area-inset-bottom, 0px))",
                zIndex: 9999,
                background: "rgba(10,10,10,0.94)",
                border: "1px solid #2b2b31",
                borderRadius: 12,
                padding: "12px 14px",
                color: "#e6e6ea",
                font: "12px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace",
                backdropFilter: "blur(8px)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <strong style={{ letterSpacing: ".08em", color: "#8b8b93" }}>
                    PERF · ?perf=1
                </strong>
                <button
                    onClick={copy}
                    style={{
                        background: "#fff",
                        color: "#000",
                        border: 0,
                        borderRadius: 999,
                        padding: "4px 12px",
                        font: "inherit",
                        fontWeight: 700,
                    }}
                >
                    {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                </button>
            </div>

            {rows.length === 0 ? (
                <div style={{ color: "#8b8b93" }}>กำลังวัด…</div>
            ) : (
                rows.map((r) => (
                    <div
                        key={r.label}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 12,
                        }}
                    >
                        <span style={{ color: "#8b8b93" }}>{r.label}</span>
                        <span
                            style={{
                                color: r.warn ? "#e3b364" : "#fff",
                                fontWeight: r.warn ? 700 : 400,
                            }}
                        >
                            {r.value}
                        </span>
                    </div>
                ))
            )}
        </div>
    )
}

export default PerfOverlay
