import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import Image from "next/image";
import ImageUploading, { ImageListType } from "react-images-uploading";

type Link = {
  title: string,
  url: string,
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [links, setLinks] = useState<Link[]>();
  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log("user", user);
      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("links")
          .select("title, url")
          .eq("user_id", userId);
        if (error) throw error;
        setLinks(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    if (userId) {
      getLinks();
    }
  }, [userId]);

  const addNewLink = async () => {
    try {
      if (title && url && userId) {
        const { data, error } = await supabase.from("links").insert({
          title: title,
          url: url,
          user_id: userId
        })
          .select();
        if (error) throw error;
        console.log("data: ", data);
        if (links) {
          setLinks([...data, ...links])
        }

      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const uploadProfilePicture = async () => {
    try {
      if (images.length > 0) {
          const image = images[0];
          if (image.file && userId) {
            const { data, error } = await supabase.storage.from("public")
            .upload(`${userId}/${image.file.name}`, image.file , {
              upsert: true
            });
          if (error) throw error;
          const resp = supabase.storage.from("public").getPublicUrl(data.path);
          const publicUrl = resp.data.publicUrl;
          const updateUserResponse = await supabase
                .from("users")
                .update({profile_picture_url: publicUrl })
                .eq("id", userId);
          if (updateUserResponse.error) throw error
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <div className="flex flex-col w-full justify-center items-center mt-4">
      {links?.map((link: Link, index: number) => (
        <div
          className="shadow-lg w-96 bg-indigo-500 mt-4 p-4 rounded-lg text-center text-white"
          key={index}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = link.url
          }}
        >
          {link.title}
        </div>
      ))}
      {isAuthenticated && (
        <>
          <div>
            <h1>New link creation</h1>
            <div className="mt-4">
              <div className="block text-sm font-medium text-gray-700">
                Title
              </div>
              <input
                type="text"
                name="title"
                id="title"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="my awesome link"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <div className="block text-sm font-medium text-gray-700">
                Url
              </div>
              <input
                type="text"
                name="url"
                id="url"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="my awesome url"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
              onClick={addNewLink}
            >
              Add new link
            </button>
          </div>
          <div>
            <h1>Image uploading</h1>
            <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>Update</button>
                      <button onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <button
              type="button"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
              onClick={uploadProfilePicture}
            >
              Upload profile picture
            </button>
          </div>
        </>
      )}
    </div>
  )
}