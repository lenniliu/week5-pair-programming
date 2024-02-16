import React, { useEffect } from 'react';
import Service from "./Service";
import Title from "./Title";
import { useState } from "react";

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const apiUrl = "";
  
  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setServicesData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <section className="section services" id="services">
        <Title title="our" span="services" />
        <div className="section-center services-center">
          {servicesData.map((service) => (
            <Service key={service.id} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Services;
