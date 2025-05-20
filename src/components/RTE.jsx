import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form' // we can also use forwordref

// controll will pass on the everything from this comp to another which is calling it 
const RTE = ({ name, control, label, defaultValue = "" }) => {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
                name={name || "content"}
                control={control} //control will be given by parent element
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='4zz6hz7ipa8xtd6byj6o4c4rfm6o5kce3fi2ygfb4f1jkxdg'
                        initialValue={defaultValue}
                        init={{
                            height: 400,
                            menubar: true,
                            plugins: [
                                'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace',
                                'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                            ],

                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            content_style: "body { font-family:Helvetica, Arial, sans-serif; font-size:14px }"

                        }}
                        onEditorChange={onChange}
                    />
                )}

            />
        </div>
    )
}

export default RTE