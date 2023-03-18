
import Head from 'next/head';
import useState from 'react-usestateref';
import styles from '@/styles/Home.module.css'
import ChatInput from '@/components/ChatInput'
import ChatMessage from '@/components/ChatMessage'
import { MessageProps } from '@/utils/MessageProps';
import { Creator } from '@/utils/MessageProps';
import BaseLayout from "@/components/BaseLayout";



export default function Home() {
	const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
	const [loading, setLoading] = useState(false);

	const callApi = async (input: string) => {
		setLoading(true);

		const myMessage: MessageProps = {
			text: input,
			from: Creator.Me,
			key: new Date().getTime()
		};

		setMessages([...messagesRef.current, myMessage]);
		const response = await fetch('/api/generate-answer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt: input
			})
		}).then((response) => response.json());
		setLoading(false);

		if (response.text) {
			const botMessage: MessageProps = {
				text: response.text,
				from: Creator.Bot,
				key: new Date().getTime()
			};
			setMessages([...messagesRef.current, botMessage]);
		} else {
			// Show error
		}
	};

  return (
    <>
	  <BaseLayout>
        <div>ChatGPT</div>
		<Head>
        <title>ChatGPT</title>
        <meta name="description" content="ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <ChatInput onSend={(input) => callApi(input)} disabled={loading}/>
          <div className="mt-10 px-4">
            {messages.map((msg: MessageProps) => (
              <ChatMessage key={msg.key} text={msg.text} from={msg.from} />
            ))}
            {messages.length == 0 && <p className="text-center text-gray-400">I am at your service</p>}
        </div>
		</main>
      </BaseLayout>
    </>
  )
}
