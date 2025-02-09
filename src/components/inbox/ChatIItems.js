import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/convesationsApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error";
import moment from "moment";
import getPartnerInfo from "../../utils/getPartnerInfo";
import gravatarUrl from "gravatar-url"
import { Link } from "react-router-dom";

export default function ChatItems() {


    const { user } = useSelector(state => state.auth);
    const { email } = user || {};
    const { data: conversation, isLoading, isSuccess, isError, error } = useGetConversationsQuery(email);

    const usersss = useSelector(state => state.auth)



    let content = null;
    if (isLoading) {
        content = <li className="m-2 text-center" >Loading...</li>
    } else if (!isLoading && isError) {
        content = <Error message={error?.data} />
    } else if (!isLoading && isError && conversation?.length === 0) {
        content = <li className="m-2 text-center" >No conversations found.</li>
    } else if (!isLoading && !isError && conversation?.length > 0) {
        content = conversation.map(singleConversation => {
            const { id, message, timestamp, users } = singleConversation;

            const { name, email: partnerEmail } = getPartnerInfo(users, email)

            return (
                <li key={id}>
                    <Link to={`/inbox/${id}`}>
                        <ChatItem
                            avatar={gravatarUrl(partnerEmail, {
                                size: 80,
                            })}
                            name={name}
                            lastMessage={message}
                            lastTime={moment(timestamp).fromNow()}
                        />
                    </Link>
                </li>
            )
        })
    }

    return (
        <ul>
            {content}

        </ul>
    );
}
