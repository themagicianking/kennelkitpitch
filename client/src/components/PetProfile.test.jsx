import { render } from "@testing-library/react";
import { PetProfile } from "./PetProfile";
const baseURL = import.meta.env.VITE_API_URL;

describe.skip("Pet Profile", () => {
  const profile = render(<PetProfile baseURL={baseURL} />);
  it("renders the profile", () => {
    expect(profile);
  });
});
