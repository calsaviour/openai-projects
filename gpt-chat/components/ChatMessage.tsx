import Image from 'next/image';
import { MessageProps, Creator } from "../utils/MessageProps"
import userPic from '../public/user.png';
import botPic from '../public/bot.png';


// One message in the chat
const ChatMessage = ({ text, from }: MessageProps) => {
	return (
		<>
			{from == Creator.Me && (
				<div className="bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
					<Image src={userPic} alt="User" width={40} />
					<p className="text-gray-700">{text}</p>
				</div>
			)}
			{from == Creator.Bot && (
				<div className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
					<Image src={botPic} alt="User" width={40} />
					<p className="text-gray-700">{text}</p>
				</div>
			)}
		</>
	);
};

export default ChatMessage;