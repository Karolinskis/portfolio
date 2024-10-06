"use client";
import { useState } from "react";
import axios from "axios";
import * as Form from "@radix-ui/react-form";
import { Button } from "./ui/button";

export default function Message() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageSending, setMessageSending] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Sending email...");
    setMessageSending(true);

    const response = await axios
      .post("/api/sendMessage", {
        email,
        message,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        setError(error.response.data.responseBody.error.message);
        console.error(error.response.data.responseBody.error.message);
      });

    setMessageSending(false);

    return setMessageSent(true);
  };

  return (
    <Form.Root
      className="w-full max-w-md h-full p-6 border border-gray-200 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <Form.Field name="email">
        <div className="flex align-baseline justify-between">
          <Form.Label className="block font-normal text-black dark:text-white">
            Email
          </Form.Label>
          <Form.Message
            match="valueMissing"
            className="text-gray-800 dark:text-gray-200 leading-tight"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            match="typeMismatch"
            className="text-gray-800 dark:text-gray-200 leading-tight"
          >
            Please enter a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-dark dark:text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="message" className="mt-4">
        <div className="flex align-baseline justify-between">
          <Form.Label className="block font-normal text-black dark:text-white">
            Message
          </Form.Label>
          <Form.Message
            match="valueMissing"
            className="text-gray-800 dark:text-gray-200 leading-tight"
          >
            Please enter your message
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-dark dark:text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <Button
          type="submit"
          disabled={messageSending}
          variant="outline"
          className="mt-2"
        >
          {messageSending ? "Sending..." : "Send"}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
}
