// todo: search material tailwind documentation to find a way to set a default tab
// todo: change styling for tooltip info
// todo: change color scheme
// todo: add title font
import {
  Card,
  CardHeader,
  Typography,
  Tooltip,
  IconButton,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  TabPanel,
  TabsBody,
  CardFooter,
  Button,
  Switch,
  checkbox,
} from "@material-tailwind/react";

import { useState } from "react";

export default function PetProfile({
  id,
  petname,
  species,
  breed,
  sex,
  altered,
  birthday,
  weight,
  physicaldesc,
  checkedin,
  staytype,
  owner,
}) {
  const [isChecked, setIsChecked] = useState(checkedin);
  // get string to indicate altered/unaltered
  function getAltered(altered) {
    // set variable for return statement
    let alteredString;
    if (altered && sex == "male") {
      alteredString = "Neutered";
    } else if (altered && sex == "female") {
      alteredString = "Spayed";
    } else {
      alteredString = "Intact";
    }
    return alteredString;
  }

  let alteredString = getAltered(altered);
  // calculate pet age based on birthday
  function getAge(birthday) {
    // convert birthday into date object
    const birthdate = Date.parse(birthday);
    // get current date
    const today = Date.now();
    // get time elapsed between birthday and current date
    const millisecondsElapsed = today - birthdate;
    const secondsElapsed = millisecondsElapsed / 1000;
    const minutesElapsed = secondsElapsed / 60;

    // get days elapsed since pet's birthdate
    const daysElapsed = minutesElapsed / 1440;

    // set variables for pet's age in years, months, and days
    let yearsElapsed;
    let monthsElapsed = 0;
    let daysRemaining = 0;

    // get years if pet is more than 1 year old
    if (daysElapsed / 365 > 1) {
      yearsElapsed = Math.floor(daysElapsed / 365);
      daysRemaining = Math.floor(daysElapsed % 365);
    } else {
      yearsElapsed = 0;
    }

    // get months if pet is more than 30 days old or some years + more than 30 days old
    if (daysRemaining / 30.4167 > 1) {
      monthsElapsed = Math.floor(daysRemaining / 30.4167);
    }

    // set variable for return statement
    let ageString = "";
    // create age string based on pet age
    if (yearsElapsed == 0 && monthsElapsed == 0) {
      ageString = `${daysElapsed} days`;
    } else if (yearsElapsed == 0 && monthsElapsed > 0) {
      ageString = `${monthsElapsed} months`;
    } else if (monthsElapsed == 0) {
      ageString = `${yearsElapsed} years`;
    } else {
      ageString = `${yearsElapsed} years ${monthsElapsed} months`;
    }

    // return pet age
    return ageString;
  }

  let age = getAge(birthday);

  const data = [
    {
      label: "Notes",
      value: "notes",
      desc: "notes here",
    },
    {
      label: "History",
      value: "history",
      desc: "history here",
    },
    {
      label: "Vaccines",
      value: "vaccines",
      desc: `vaccines here`,
    },
    {
      label: "Reservations",
      value: "reservations",
      desc: `reservations here`,
    },
  ];

  async function toggleCheckIn(usertoggle) {
    await fetch("http://localhost:5000/checkin", {
      method: "PUT",
      body: JSON.stringify({ id: id, checkedin: usertoggle }),
      headers: { "Content-Type": "application/json" },
    });
  }

  function handleChange(e) {
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
          {petname} {owner.lastname}
        </Typography>
        {isChecked && staytype == "daycare" ? (
          <>
            <Tooltip content="This pet is checked in.">
              <IconButton
                variant="gradient"
                className="rounded-full pet-profile-header-item"
              >
                <i className="fas fa-check" />
              </IconButton>
            </Tooltip>
            <Tooltip content="This is a daycare pet.">
              <IconButton
                variant="gradient"
                className="rounded-full pet-profile-header-item"
              >
                <i className="fas fa-sun" />
              </IconButton>
            </Tooltip>
          </>
        ) : isChecked && staytype == "boarding" ? (
          <>
            <Tooltip content="This pet is checked in.">
              <IconButton
                variant="gradient"
                className="rounded-full pet-profile-header-item"
              >
                <i className="fas fa-check" />
              </IconButton>
            </Tooltip>
            <Tooltip content="This is a boarding pet.">
              <IconButton
                variant="gradient"
                className="rounded-full pet-profile-header-item"
              >
                <i className="fas fa-moon" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <></>
        )}
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
              {physicaldesc}
            </Typography>
          </figure>
          <ul>
            <li>
              {" "}
              {species == "dog" ? (
                <i className="fas fa-dog" />
              ) : (
                <i className="fas fa-cat" />
              )}{" "}
              {breed}
            </li>
            <li>
              {" "}
              {sex == "male" ? (
                <i className="fas fa-mars" />
              ) : (
                <i className="fas fa-venus" />
              )}{" "}
              {alteredString}
            </li>
            <li>
              {age} · {weight}lbs
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
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
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
