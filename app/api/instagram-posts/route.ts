import { NextResponse } from "next/server"

const INSTAGRAM_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxt9Mb5AxkUg_vHjpz7U5DV4pJwi7kbzHuosQ4WUSdnWWrZxPm7Bg11-p6hJxmD7KWgbA/exec"

export const dynamic = "force-dynamic"
export const revalidate = 0

type InstagramMediaItem = {
    id: string
    caption?: string | null
    media_url: string
    permalink?: string
    type?: string
    timestamp?: string
    [key: string]: unknown
}

type InstagramScriptResponse = {
    mediaData?: unknown
    [key: string]: unknown
}

const isInstagramMediaArray = (value: unknown): value is InstagramMediaItem[] => {
    if (!Array.isArray(value)) {
        return false
    }

    return value.every((item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as InstagramMediaItem).id === "string" &&
        typeof (item as InstagramMediaItem).media_url === "string"
    )
}

export async function POST() {
    try {
        const upstreamResponse = await fetch(INSTAGRAM_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purpose: "get-ig-posts" }),
            cache: "no-store",
        })

        if (!upstreamResponse.ok) {
            const errorBody = await upstreamResponse.text()
            console.error("Instagram posts upstream error", {
                status: upstreamResponse.status,
                body: errorBody,
            })

            return NextResponse.json(
                {
                    error: "Failed to fetch Instagram posts",
                },
                { status: upstreamResponse.status }
            )
        }

        const data: InstagramScriptResponse = await upstreamResponse.json()

        const { mediaData } = data

        if (isInstagramMediaArray(mediaData)) {
            return NextResponse.json({ mediaData })
        }

        if (isInstagramMediaArray(data)) {
            return NextResponse.json({ mediaData: data })
        }

        return NextResponse.json({ mediaData: [] })
    } catch (error) {
        console.error("Instagram posts route error", error)
        return NextResponse.json(
            {
                error: "Unable to load Instagram posts",
            },
            { status: 500 }
        )
    }
}

