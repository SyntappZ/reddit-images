import React, { useState } from "react";
import { Card, Accordion, useAccordionToggle } from "react-bootstrap";
import { ListTitleProps, MultiListProps } from "../interfaces/MainInterfaces";
import { FaChevronDown } from "react-icons/fa";
import "../css/MultiListItem.css";

const green = "#17a2b8";
const dark = "#3e4349";
const grey = "#dadada";

const MultiListItem = ({
  title,
  list,
  icon,
  eventKey,
  sendName,
}: MultiListProps) => {
  return (
    <Accordion>
      <Card
        style={{ backgroundColor: dark, borderWidth: 0 }}
        className="text-white"
      >
        <Card.Header>
          <ListTitle eventKey={eventKey} title={title} icon={icon} />
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body style={{ backgroundColor: dark }}>
            <div className="list-body">
              {list.map((subreddit: string) => (
                <p
                  key={subreddit}
                  className="reddit-list-item"
                  onClick={() => sendName(subreddit)}
                >
                  r/{subreddit}
                </p>
              ))}
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

const ListTitle = ({ eventKey, title, icon }: ListTitleProps) => {
  const [degrees, setDegrees] = useState<number>(-90);

  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    degrees ? setDegrees(0) : setDegrees(-90);
  });

  return (
    <div className="top-list" onClick={decoratedOnClick}>
      <div className="top-list-wrap">
        {icon}
        <h5>{title}</h5>
      </div>
      <div className="down-icon-wrap">
        <FaChevronDown
          className="down-icon"
          style={{ transform: `rotate(${degrees}deg)` }}
        />
      </div>
    </div>
  );
};

export default MultiListItem;
