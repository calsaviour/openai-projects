import React from 'react';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Prompt = () => {
  const [value, setValue] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('');
  const [completion, setCompletion] = React.useState<string>('');

  // const handleInput = React.useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setValue(e.target.value);
  //     setPrompt(e.target.value);
  //     console.log(value);
  //     console.log(prompt);
  //   }, []);

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setPrompt(value);
        console.log(value)
        setCompletion('Loading...');
        const response = await fetch('/api/prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();
        setValue('');
        setCompletion(data);
        console.log(data)
        console.log(data.data)
      }
    }, [value]);

  return (
    <div className={styles.main}>
      <div>Please type your prompt</div>
      <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
      <div>Prompt: {prompt}</div>
      <ul>Completion:
        <div>{completion}</div>
      </ul>
    </div>
  );
};

export default Prompt;