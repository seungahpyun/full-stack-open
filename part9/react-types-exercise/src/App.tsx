import React from 'react';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface HeaderProps {
    courseName: string;
  }

  interface courseParts {
    name: string;
    exerciseCount: number;
  }

  interface ContentProps {
    courseParts: courseParts[];
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>;
  };

  const Content = (props: ContentProps) => {
    return (
      <div>
        {props.courseParts.map((course, index) => (
          <p key={index}>
            {course.name} {course.exerciseCount}
          </p>
        ))}
      </div>
    );
  };

  const Total = (props: ContentProps) => {
    return (
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
