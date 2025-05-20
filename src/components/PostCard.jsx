import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, featuredImage }) => { //will get from appwrite
    console.log("PostCard featuredImage:", featuredImage); // Log the featuredImage

    const imageUrl = featuredImage ? service.getFilePreview(featuredImage) : `https://placehold.co/600x400?text=No+Image`

    console.log("PostCard ID:", $id); // Log the imageUrl
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={imageUrl} alt={title} className='rounded-xl'
                        loading="lazy"
                    />
                </div>
                <h2
                    className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard