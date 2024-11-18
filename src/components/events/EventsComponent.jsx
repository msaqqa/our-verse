import React, { useState, useEffect } from "react";

const EventsComponent = ({ title, api, viewStyle, itemsLimit, styles }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [api]);

  const displayedEvents = events.slice(0, itemsLimit);

  return (
    <div style={{ ...styles }}>
      {title && <h4>{title}</h4>}
      {viewStyle === "card" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
          {displayedEvents.map((event, idx) => (
            <div
              key={idx}
              style={{ border: "1px solid #ddd", padding: "10px" }}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
          {events.length > itemsLimit && <li>View All</li>}
        </div>
      ) : (
        <ul>
          {displayedEvents.map((event, idx) => (
            <li key={idx}>
              <strong>{event.title}</strong>: {event.description}
            </li>
          ))}
          {events.length > itemsLimit && <li>View All</li>}
        </ul>
      )}
    </div>
  );
};

export default EventsComponent;
