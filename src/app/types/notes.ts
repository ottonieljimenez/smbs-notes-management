import { type Database } from "../types/database"

export type NoteEntity = Database['public']['Tables']['notes']['Row']
export type UserEntity = Database['public']['Tables']['users']['Row']

export type Note = NoteEntity & {
    user: UserEntity | null;
}