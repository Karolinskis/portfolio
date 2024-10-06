import axios from "axios";
import { MessageRequest, MessageResponse } from "@/types/message";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const body = await req.json();
  const data: MessageRequest = body;

  let responseBody: MessageResponse;

  if (!data) {
    responseBody = {
      success: false,
      error: {
        message: "No data provided.",
        type: "missing_data",
      },
    };
    return NextResponse.json({ responseBody }, { status: 400 });
  }

  if (!data.email || !data.message) {
    responseBody = {
      success: false,
      error: {
        message: "Email and message are required.",
        type: "missing_fields",
      },
    };
    return NextResponse.json({ responseBody }, { status: 400 });
  }

  if (!emailRegex.test(data.email)) {
    responseBody = {
      success: false,
      error: {
        message: "Invalid email.",
        type: "invalid_email",
      },
    };
    return NextResponse.json({ responseBody }, { status: 400 });
  }

  try {
    axios
      .post(process.env.DISCORD_WEBHOOK_URL!, {
        embeds: [
          {
            color: 3108090,
            title: data.email,
            author: {
              name: req.headers.get("x-forwarded-for") ?? "Unknown",
            },
            description: data.message,
          },
        ],
      })
      .then((res) => {
        if (res.data.err) {
          const responseBody: MessageResponse = {
            success: false,
            error: {
              message: res.data.err,
              type: "discord_error",
            },
          };
          return NextResponse.json({ responseBody }, { status: 400 });
        }

        return NextResponse.json({ success: true } as MessageResponse, {
          status: 200,
        });
      });
  } catch (error) {
    const responseBody: MessageResponse = {
      success: false,
      error: {
        message: (error as any).message,
        type: "discord_error",
      },
    };
    return NextResponse.json({ responseBody }, { status: 500 });
  }

  return NextResponse.json({ success: true } as MessageResponse, {
    status: 200,
  });
}
