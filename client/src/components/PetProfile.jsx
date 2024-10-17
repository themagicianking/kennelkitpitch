// todo: search material tailwind documentation to find a way to set a default tab
// todo: change styling for tooltip info
// todo: change color scheme
// todo: add title font
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  TabPanel,
  TabsBody,
  CardFooter,
  Button,
  Switch,
} from "@material-tailwind/react";
import { useState } from "react";
import { getAltered, getAge } from "../utilities/pets";
import { PetProfileIconBar } from "./PetProfileIconBar";

export default function PetProfile({ pet, owner }) {
  const [isChecked, setIsChecked] = useState(pet.checkedin);

  let alteredString = getAltered(pet.altered, pet.sex);
  let age = getAge(pet.birthday);

  async function toggleCheckIn(usertoggle) {
    await fetch("http://localhost:5000/checkin", {
      method: "PUT",
      body: JSON.stringify({ id: pet.id, checkedin: usertoggle }),
      headers: { "Content-Type": "application/json" },
    });
  }

  function handleChange() {
    setIsChecked(!isChecked);
    toggleCheckIn(isChecked);
  }

  return (
    <Card shadow={true} variant="gradient" color="white">
      <CardHeader
        floated={false}
        color="gray"
        className="rounded-b-none pet-profile-header"
      >
        <Typography variant="h2" className="pet-profile-header-item">
          {pet.petname} {owner.lastname}
        </Typography>
        <PetProfileIconBar isChecked={isChecked} staytype={pet.staytype} />
      </CardHeader>
      <CardBody className="pet-profile-body">
        <div className="pet-stats">
          <figure>
            <img
              className="h-96 w-96 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50 pet-profile-image"
              src="https://lh3.googleusercontent.com/pw/AP1GczPul97HrD-i2k9STdgNDmvTyVJI1bFyxJRoTZiLVSu4Q9pCQiYitPJs3_sIdGLEnS8RCwVewLlNBZY_r935JYiG1v4bb_-5-Z-Yc2LDC4JawfKHJlrO1tHPGdrSkrsBpsxrEYPQiD2Vg2EeR8ismGzQ=w1270-h1686-s-no-gm?authuser=0"
            ></img>
            <Typography
              as="caption"
              variant="small"
              className="mt-2 text-center font-normal"
            >
              {pet.physicaldesc}
            </Typography>
          </figure>
          <ul>
            <li>
              {" "}
              {pet.species == "dog" ? (
                <i className="fas fa-dog" />
              ) : (
                <i className="fas fa-cat" />
              )}{" "}
              {pet.breed}
            </li>
            <li>
              {" "}
              {pet.sex == "male" ? (
                <i className="fas fa-mars" />
              ) : (
                <i className="fas fa-venus" />
              )}{" "}
              {alteredString}
            </li>
            <li>
              {age} · {pet.weight}lbs
            </li>
            <li>
              <Typography variant="h5">
                Owner: {owner.firstname} {owner.lastname}
              </Typography>
              <ul>
                <li>
                  {owner.phone} · {owner.email}
                </li>
              </ul>
            </li>
            <li>
              <Typography variant="h5">
                Emergency Contact: {owner.ecfirstname} {owner.eclastname}
              </Typography>
              <ul>
                <li>
                  {owner.ecphone} · {owner.ecemail}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Tabs className="rounded-lg pet-tabs">
          <TabsHeader>
            <Tab key="Notes" value="Notes">
              Notes
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel key="Notes" value="Notes">
              Notes description goes here
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
      <CardFooter className="gap-4 pet-profile-footer">
        <Button>Edit</Button>
        <Switch
          color="green"
          label="Checked In?"
          checked={isChecked}
          onChange={handleChange}
        />
      </CardFooter>
    </Card>
  );
}
