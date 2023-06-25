import { NoteData, Tag } from "../../App";
import NoteForm from "../NoteFrom/NoteForm";

interface NewNoteProps{
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const NewNote: React.FC<NewNoteProps> = ({ onSubmit, onAddTag, availableTags } ) => {
  return ( 
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
   );
}
 
export default NewNote;