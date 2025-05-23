import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import service from '../../appwrite/config'
import { Button, Input, Select, RTE } from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({ post }) => {

    // watch is used to monitor any feild continously 
    // to set any value in a form we will use setValue 
    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            status: "active",
        }
    })

    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                slug: post.slug || "",
                content: post.content || "",
                status: post.status || "active",
            })
        }
    }, [post, reset])



    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;

            const updatedPost = { ...data };
            if (file) {
                if (post.featuredImage) {
                    await service.deleteFile(post.featuredImage);
                }
                updatedPost.featuredImage = file.$id;
            } else {
                // If no new file, keep the old featuredImage
                updatedPost.featuredImage = post.featuredImage;
            }

            const dbPost = await service.updatePost(post.$id, updatedPost);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
            data.featuredImage = file ? file.$id : ""; // Allow empty string if no image

            const dbPost = await service.createPost({
                ...data,
                userId: userData.$id,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };
    const slugTranform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")  // remove special characters
                .replace(/\s+/g, "-")      // replace spaces with hyphens
        }
        return ""
    }, [])
    console.log("PostCard:", post);

    useEffect(() => {
        const subsription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTranform(value.title,
                    { shouldValidate: true }
                ))
            }
        })

        return () => {
            subsription.unsubscribe()
        }
    }, [watch, slugTranform, setValue])


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title:"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTranform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm