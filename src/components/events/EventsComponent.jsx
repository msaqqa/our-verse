import React, { useState, useEffect } from "react";
const EventsComponent = ({ title, api, viewStyle, itemsLimit }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(api);
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [api]);

  const displayedEvents = events.slice(0, itemsLimit);

  return (
    <div className="events-container">
      {loading ? (
        <h3>Loading ...</h3>
      ) : (
        <>
          {title && <h3>{title}</h3>}
          {viewStyle === "card" ? (
            <div className="events-card">
              {displayedEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="card-item"
                  style={{
                    backgroundImage: `url(${event.images && event.images[0]})`,
                  }}
                >
                  <div className="card-txt">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">
                      {event.description.substr(0, 100)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="events-list">
              {displayedEvents.map((event, idx) => (
                <div key={idx} className="list-item">
                  <div className="item-img">
                    <img
                      src={event.images && event.images[0]}
                      alt="item-image"
                    />
                  </div>
                  <div className="item-txt">
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-description">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {events.length > itemsLimit && (
            <div>
              <a href="#" className="view-all">
                View All
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsComponent;
