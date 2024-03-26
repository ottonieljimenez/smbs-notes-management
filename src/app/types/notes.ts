import { type Database } from "../types/database"

type NoteEntity = Database['public']['Tables']['notes']['Row']
type UserEntity = Database['public']['Tables']['users']['Row']

export type Note = NoteEntity & {
    user: UserEntity
}