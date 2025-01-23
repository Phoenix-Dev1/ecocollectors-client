import { useState, Fragment, useEffect } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Avatar,
} from '@material-tailwind/react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import ec from '../../img/sm-logo.png';
import liran from '../../img/liran.jpg';
import bar from '../../img/bar.jpg';
import manager from '../../img/recyclers-manager-icon.png';
import maps from '../../img/google-maps-icon.webp';

export default function About() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  useEffect(() => {
    setOpen(1); // Open the first accordion on initial load or refresh
  }, []);

  return (
    <Fragment>
      {/* About Eco-Collectors Accordion */}
      <Accordion
        open={open === 1}
        animate={customAnimation}
        className="bg-gray-700"
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="bg-gray-800 text-white px-12 py-8 flex items-center justify-between"
        >
          <Avatar src={ec} alt="avatar" className="mr-5" />
          About Eco-Collectors
          {open === 1 ? (
            <ArrowUpIcon className="w-5 h-5 ml-auto" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 ml-auto" />
          )}
        </AccordionHeader>
        {open === 1 && (
          <AccordionBody className="text-white text-base font-bold px-6 py-4">
            Eco-Collectors is a recycling initiative founded by Liran and Bar,
            two students at the Technion University in Haifa, Israel. Our
            mission is to promote recycling and contribute to a cleaner
            environment.
          </AccordionBody>
        )}
      </Accordion>

      {/* Liran - The Collector Accordion */}
      <Accordion
        open={open === 2}
        animate={customAnimation}
        className="bg-gray-700"
      >
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="bg-gray-800 text-white px-12 py-8"
        >
          <Avatar src={liran} alt="avatar" className="mr-5" />
          Liran - The Collector
          {open === 2 ? (
            <ArrowUpIcon className="w-5 h-5 ml-auto" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 ml-auto" />
          )}
        </AccordionHeader>
        {open === 2 && (
          <AccordionBody className="text-white text-base font-bold px-6 py-4">
            Liran is a dedicated collector who gathers bottles for recycling. He
            plays a vital role in our initiative by collecting bottles from
            various sources and ensuring they are properly recycled.
          </AccordionBody>
        )}
      </Accordion>

      {/* Bar - The Recycler Accordion */}
      <Accordion
        open={open === 3}
        animate={customAnimation}
        className="bg-gray-700"
      >
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="bg-gray-800 text-white px-12 py-8"
        >
          <Avatar src={bar} alt="avatar" className="mr-5" />
          Bar - The Recycler
          {open === 3 ? (
            <ArrowUpIcon className="w-5 h-5 ml-auto" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 ml-auto" />
          )}
        </AccordionHeader>
        {open === 3 && (
          <AccordionBody className="text-white text-base font-bold px-6 py-4">
            Bar is responsible for recycling the collected bottles. After
            requesting collection, Bar meets with the designated collector,
            receives the bottles, and ensures they are placed in the appropriate
            recycling facilities.
          </AccordionBody>
        )}
      </Accordion>

      {/* The Recycler's Manager Accordion */}
      <Accordion
        open={open === 4}
        animate={customAnimation}
        className="bg-gray-700"
      >
        <AccordionHeader
          onClick={() => handleOpen(4)}
          className="bg-gray-800 text-white px-12 py-8"
        >
          <Avatar src={manager} alt="avatar" className="mr-5" />
          The Recycler's Manager
          {open === 4 ? (
            <ArrowUpIcon className="w-5 h-5 ml-auto" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 ml-auto" />
          )}
        </AccordionHeader>
        {open === 4 && (
          <AccordionBody className="text-white text-base font-bold px-6 py-4">
            The Recycler's Manager, handled by Liran and Bar, oversees the
            operations and addresses user complaints. Additionally, the manager
            reviews and approves new recyclers who submit their information
            through the authorization form on our website.
          </AccordionBody>
        )}
      </Accordion>

      {/* Google Maps Integration Accordion */}
      <Accordion
        open={open === 5}
        animate={customAnimation}
        className="bg-gray-700"
      >
        <AccordionHeader
          onClick={() => handleOpen(5)}
          className="bg-gray-800 text-white px-12 py-8"
        >
          <Avatar src={maps} alt="avatar" className="mr-5" />
          Google Maps Integration
          {open === 5 ? (
            <ArrowUpIcon className="w-5 h-5 ml-auto" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 ml-auto" />
          )}
        </AccordionHeader>
        {open === 5 && (
          <AccordionBody className="text-white text-base font-bold px-6 py-4">
            We have integrated the Google Maps API into our website to provide a
            map interface where users can view and upload requests for bottle
            collection. Currently, we are focusing on serving the city of Haifa,
            Israel.
          </AccordionBody>
        )}
      </Accordion>
    </Fragment>
  );
}
