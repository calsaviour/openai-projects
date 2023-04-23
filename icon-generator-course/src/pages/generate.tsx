import { type NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { FormGroup } from "~/components/FormGroup";
import { Input } from "~/components/input";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });

  const generateIcon =  api.generate.generateIcon.useMutation({
    onSuccess(data) {
      console.log("mutation finished", data )
    }
  });


  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value
      }))
    };
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    generateIcon.mutate({
      prompt: form.prompt
    });
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <form className="flex flex-col gap-4"
          onSubmit={handleFormSubmit}
        >
            <FormGroup>
              <label>Prompt</label>
              <Input
                value={form.prompt}
                onChange={updateForm("prompt")}></Input>
            </FormGroup>
            <button className="rounded bg-blue-400 px-4 py-2 hover:bg-blue-500">Submit</button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
