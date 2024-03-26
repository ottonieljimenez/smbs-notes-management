import PostCard from "./post-card"
import { type Note } from "../types/notes"

export function NotesList({ notes }: { notes: Note[] | null }) {
    return (
        <>
            {
                notes?.map(note => {
                    const {
                        id,
                        user,
                        content
                    } = note

                    const {
                        user_name: userName,
                        name: userFullName,
                        avatar_url: avatarUrl,
                    } = user

                    return (
                        <PostCard
                            avatarUrl={avatarUrl}
                            content={content}
                            key={id}
                            userFullName={userFullName}
                            userName={userName}
                        />
                    )
                })
            }
        </>
    )
}