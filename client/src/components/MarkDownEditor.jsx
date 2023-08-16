import React, { useRef , memo} from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MarkDownEditor=({label,value, changeValue, name, invadField,setInvalidFields})=>{
  
  return (
    <div className='flex flex-col '>
        <span className=''>{label}</span>
      <Editor
        apiKey='fxpxxfyox0n89ag6tjihd64mrew7ik4umxmhu46iteeqdd7s'
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={e=>changeValue(prev=>({...prev, [name]:e.target.getContent()}))}
        onFocus={()=>setInvalidFields && setInvalidFields([])}
      />
      {invadField?.some(el=>el.name===name) && <small  className='text-main text-sm'>{invadField?.find(el=>el.name===name)?.mes}</small>}
    </div>
  );
}
export default memo(MarkDownEditor)
