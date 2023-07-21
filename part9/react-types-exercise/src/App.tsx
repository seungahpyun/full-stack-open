import React from 'react';

const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: "basic"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartBase {
    description: string;
    requirements: string[];
    kind: "special"
  }

  interface HeaderProps {
    courseName: string;
  }

  interface ContentProps {
    courseParts: CoursePart[];
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const Part = (props: { part: CoursePart }) => {
    switch (props.part.kind) {
      case "basic":
        return (
          <div>
            <h3>{props.part.name} {props.part.exerciseCount}</h3>
            <p><i>{props.part.description}</i></p>
          </div>
        );
      case "group":
        return (
          <div>
            <h3>{props.part.name} {props.part.exerciseCount}</h3>
            <p>project exercises {props.part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>{props.part.name} {props.part.exerciseCount}</h3>
            <p><i>{props.part.description}</i></p>
            <p>background material: {props.part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <h3>{props.part.name} {props.part.exerciseCount}</h3>
            <p><i>{props.part.description}</i></p>
            <p>required skills: {props.part.requirements.join(", ")}</p>
          </div>
        );
      default:
        return assertNever(props.part);
    }
  };

  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>;
  };

  const Content = (props: ContentProps) => {
    return (
      <div>
        {props.courseParts.map(part => <Part key={part.name} part={part} />)}
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
