import { NoteData, Tag } from "../../App";
import { useNote } from "../../layouts/NoteLayout";
import NoteForm from "../NoteFrom/NoteForm";

type EditNoteProps={
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const EditNote = ( { onSubmit, onAddTag, availableTags }: EditNoteProps ) => {

  const note = useNote()

  return ( 
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm 
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
        onSubmit={data => onSubmit(note.id, data)} 
        onAddTag={onAddTag} 
        availableTags={availableTags} />
    </>
  );
  }
 
export default EditNote;