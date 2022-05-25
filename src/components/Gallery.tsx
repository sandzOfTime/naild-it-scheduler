import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function Gallery() {
  return (
    <ImageList cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://www.byrdie.com/thmb/IwrupYtTJlbzVSiHVCETDcKulYc=/1000x1000/filters:fill(auto,1)/OliveJuneNails-f588b4900932461f93958d9a4b1f6f01-53132542f5394aae991d0f26b417e6db.jpg",
    title: "Manicure",
  },
  {
    img: "https://40plusstyle.com/wp-content/uploads/2013/07/nails1.jpg",
    title: "Gel Manicure",
  },
  {
    img: "https://images.unsplash.com/photo-1641814280326-d74ea2300067?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Gel Manicure",
  },
];
