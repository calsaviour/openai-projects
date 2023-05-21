/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-ally/alt-text */
import { type NextPage } from "next";
import clxs from "clsx";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { FormGroup } from "~/components/FormGroup";
import { Input } from "~/components/input";
import { api } from "~/utils/api";
import { Button } from "~/components/Button";

const colors = [
  "blue",
  "red",
  "pink",
  "green",
  "orange",
  "yellow",
  "white",
  "black",
]

const GeneratePage: NextPage = () => {

  const [form, setForm] = useState({
    prompt: "",
    color: "",
  });

  const [imageUrl, setImageUrl] = useState('');

  const generateIcon =  api.generate.generateIcon.useMutation({
    onSuccess(data) {
      console.log("mutation finished", data.imageUrl )
      if(!data.imageUrl) return;
      setImageUrl(data.imageUrl);
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
    generateIcon.mutate(form);
    setForm((prev) => ({
      ...prev,
      prompt: "",
    }));
  }

  return (
    <>
      <Head>
        <title>Generate Icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-24 min-h-screen flex container mx-auto flex-col gap-4 px-8">        
        <h1 className="text-6xl">Generate your icons </h1>
        <p className="text-2xl mb-12">Fill out the form below to start generating your icons.</p>
        <form className="flex flex-col gap-4"
          onSubmit={handleFormSubmit}
        >  
          <h2 className="text-xl">
            1. Describe what your want your icon to look like
          </h2>
            <FormGroup className="mb-12">
              <label>Prompt</label>
              <Input
                value={form.prompt}
                onChange={updateForm("prompt")}></Input>
            </FormGroup>

          <h2 className="text-xl">
            2. Pick your icon color.
          </h2>
            <FormGroup className="mb-12 grid grid-cols-4">
              {colors.map((color) =>(
                <label key={color} className="flex gap-2 text-2xl">
                  <input
                    type="radio"
                    name="color"
                    checked={color == form.color}
                    onChange={() => setForm((prev) => ({...prev, color}))}
                  ></input>
                    {color}
                </label>
              ))}
            </FormGroup>

            <Button
                isLoading={generateIcon.isLoading}
                disabled={generateIcon.isLoading}
            >
                Submit
            </Button>
        </form>
      
        {imageUrl && (
          <>
            <h2 className="text-xl">Your Icons</h2>
            <section className="grid grid-cols-4 gap-4 mb-12">
              <Image
                src={imageUrl}
                alt="Picture of the author"
                width={98}
                height={98}
                className="w-full"
              />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
