import React, { useEffect, useState } from "react";
import helper from '../helper';

export default function AdminMessages() {
    const [Messages, setMessages] = useState([{ Path: "", UserId: "", ImageName: "" }]);
    const [ViewMessages, setViewMessages] = useState([{ Path: "", UserId: "", ImageName: "" }]);
    const [Page, setPage] = useState(1);

    useEffect(() => {
        ServeMessages();
    }, []);

    const ServeMessages = async (page = 1) => {
        let MessageAlreadyImported = false;
        await setPage(page);
        Messages.map(async (message) => {
            if (message.key === page) {
                MessageAlreadyImported = true;
                await setViewMessages(message.value);
            }
        });
        if (!MessageAlreadyImported) {
            const responseMessages = await fetch(
                `http://localhost:1234/api/messages/serveMessagesToAdmin?page=${page}`);
            const Messages = await responseMessages.json();
            let messageReadyToView = [];
            Messages.map((message) => {
                let BodyMessage = JSON.parse(message.BodyMessage);
                messageReadyToView.push({
                    CodeAdminMessage: message.CodeAdminMessage,
                    Path: BodyMessage.Path,
                    UserId: BodyMessage.UserId,
                    ImageName: BodyMessage.ImageName,
                    Message: message.Message,
                    IsDone: message.IsDone
                })
            });
            await setViewMessages([...messageReadyToView]);
            setMessages([...Messages, { key: page, value: messageReadyToView }]);
        }
    };

    const prevAlbum = async () => {
        ServeMessages(Page - 1);
    };

    const nextAlbum = async () => {
        ServeMessages(Page + 1);
    };

    const HandleChangePage = (event) => {
        ServeMessages(JSON.parse(event.target.value));
    };
    const DeleteImageFromMessage = async (CodeAdminMessage, UserId, ImageName) => {
        helper.DeleteImage(ImageName, UserId, "true");
        IsDoneMessage(CodeAdminMessage);
    }

    const IsDoneMessage = async (CodeAdminMessage) => {
        const responseDoneMessage = await fetch(
            `http://localhost:1234/api/messages/doneMessage/${CodeAdminMessage}`,
            {
                method: "PUT"
            });
    }

    return (
        <div>
            <p>Admin message:</p>
            {ViewMessages.map((message) => (
                <div key={message.UserId}>
                    <button
                        onClick={() => DeleteImageFromMessage(message.CodeAdminMessage, message.ImageName, message.UserId)}
                        style={{ display: message.IsDone == 1 ? "none" : "block" }}>
                        delete image
                    </button>
                    <img src={message.Path} style={{ width: "80px", display: message.IsDone == 1 ? "none" : "block" }} />
                    <br />
                    <label>{message.Message}</label>
                    <br />
                    <label>{message.IsDone == 1 ? "done" : "not done"}</label>
                    <button onClick={() => IsDoneMessage(message.CodeAdminMessage)}>ignore</button>
                </div>
            ))}
            <br></br>
            <label>
                Page:
                <input type="text" value={Page} onChange={HandleChangePage} />
            </label>
            <button onClick={() => ServeMessages(Page)}>submit:</button>
            <button onClick={nextAlbum}>
                next
            </button>
            <button onClick={prevAlbum}>
                prev
            </button>
        </div>
    );
}
