import React, { useState, useCallback, useMemo } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Markdown from "markdown-to-jsx";

const ReplyMarkdown = ({onSubmit}) => {
    const [value, setValue] = useState("");
    const autofocusNoSpellcheckerOptions = useMemo(() => {
      return {
        autofocus: true,
        spellChecker: false,
      };
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
      };

    const onChange = useCallback((value) => {
      setValue(value);
    }, []);

    return (
      <form onSubmit={handleFormSubmit} >
        <SimpleMdeReact
          options={autofocusNoSpellcheckerOptions}
          value={value}
          onChange={onChange}
        />
        <h5>Preview</h5>
        <Markdown
          className="mt-2 mb-2"
          options={{
            overrides: {
              img: {
                component: "img",
                props: {
                  className: "img-markdown mt-3 mb-3",
                },
              },
            },
          }}
        >
          {value}
        </Markdown>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  };

export default ReplyMarkdown;