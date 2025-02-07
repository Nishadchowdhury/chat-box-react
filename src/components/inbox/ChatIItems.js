import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/convesationsApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error";

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
            return (
                <li key={singleConversation?.id}>
                    <ChatItem
                        avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                        name="Saad Hasan"
                        lastMessage="bye"
                        lastTime="25 minutes"
                    />
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
