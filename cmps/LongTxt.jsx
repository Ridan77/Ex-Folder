const { useState, useEffect } = React;

export function LongTxt({ txt, length }) {
  const [isLongTxt, setIsLongTxt] = useState(false);

  var newTxt;

    useEffect(() => {
    formatTxt();
  }, []);

  useEffect(() => {
    formatTxt();
  }, [isLongTxt]);

  if (!length) length = 100;

  function onReadMore() {
    console.log("reading more");
    setIsLongTxt((isLongTxt) => {
      !isLongTxt;
    });
  }
  function formatTxt() {
    if (isLongTxt) newTxt = txt;
    else newTxt = txt.substring(0, length);
  }

  console.log(isLongTxt, formatTxt());
  return (
    <div>
      <p className="long-text">
        {newTxt}{" "}
        <span className="read-more" onClick={onReadMore}>
          ...Read more
        </span>
      </p>
    </div>
  );
}
