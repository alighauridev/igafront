import React from 'react'
import Button from './Button'
import { Upload } from '@mui/icons-material';

function DeliverForm(props) {

    const filesRef = React.useRef(null);

    const handleUpload = () => {
        filesRef.current.click();
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            files: e.target.files.files,
            note: e.target.note.value,
        }
        props.handleSubmit(data);
    }


  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
        <p className='font-heading text-heading text-center'>
            Deliver your work
        </p>
        <div className='flex flex-col space-y-3'>
            <p className='font-heading text-text'>Note</p>
            <textarea type='text' name="note" className='border border-border rounded-sm p-3 font-text text-text max-w-full max-h-[100px] min-h-[100px]' />
        </div>
        <div className="flex flex-col space-y-3 ">
              <div
                onClick={handleUpload}
                className="rounded-lg border space-x-2 border-border flex flex-row p-3 items-center cursor-pointer"
              >
                <p className="text-text font-text">{filesRef?.current?.length > 0 ? `${filesRef.current.length} Files Selected` : "Upload Files"}</p>
                <Upload />
                <input
                  name='files'  
                  type="file"
                  multiple
                  ref={filesRef}
                  hidden
                />
              </div>
            </div>
        <div className='flex flex-row items-center justify-between pb-8'>
            <Button onClick={props.handleClose} style={{maxWidth:"30%",flex:1, paddingLeft:20, paddingRight:20, borderRadius:20, borderWidth:1,borderColor:"#3276FA",backgroundColor:"white",color:"#3276FA"}} text='Cancel' />
            <Button loading={props.submitLoading} type={"submit"} style={{maxWidth:"30%",flex:1, paddingLeft:20, paddingRight:20, borderRadius:20,}} text='Submit' />
        </div>

    </form>
  )
}

export default DeliverForm