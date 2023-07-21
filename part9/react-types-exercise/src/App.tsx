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

  interface courseParts {
    name: string;
    exerciseCount: number;
  }

  const Header = ({ courseName }: { courseName: string }) => {
    return <h1>{courseName}</h1>;
  };

  const Content = ({ courseParts }: { courseParts: courseParts[] }) => {
    return (
      <div>
        {courseParts.map((course, index) => (
          <p key={index}>
            {course.name} {course.exerciseCount}
          </p>
        ))}
      </div>
    );
  };

  const Total = ({ courseParts }: { courseParts: courseParts[] }) => {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
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
