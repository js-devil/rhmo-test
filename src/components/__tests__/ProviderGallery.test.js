/**

@jest-environment jsdom
*/
import React from "react";
import Gallery from "../ProviderGallery";
import { render } from "@testing-library/react";

let data = [
  {
    id: 1,
    name: "Joshua",
    description: "A developer",
    imageUrl:
      "https://i.insider.com/5ae75d4ebd967122008b4623?width=1100&format=jpeg&auto=webp",
  },
  {
    id: 2,
    name: "Seyi",
    description: "A gamer",
    imageUrl:
      "https://i.insider.com/5ae75d4ebd967122008b4623?width=1100&format=jpeg&auto=webp",
  },
];

// render.cr

describe("Gallery", () => {
  test("snapshot renders", () => {
    const component = render.create(<Gallery items={data} />);
  });
});
