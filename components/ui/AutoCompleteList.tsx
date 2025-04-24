import { AuthCompoleteComponentProps } from "@/types";
import React from "react";

const AutoCompleteList = ({
  touched,
  searchData,
  recommendedKeywords,
  setFieldValue,
  setSelectedKeyword,
  listText,
  field,
}: AuthCompoleteComponentProps) => {
  return (
    <>
      {touched && (
        <div
          className={`hero-section-form__auto-complete-input visible-scrollbar ${
            field === "job" ? "-left-[21px]" : "-left-[13px]"
          }`}
        >
          <h3 className="py-2 px-8 text-[#878787] text-sm text-left">
            {listText}
          </h3>

          {!searchData.length && (
            <ul>
              {recommendedKeywords.map((keyword, i) => (
                <li key={i}>
                  <span
                    className="auto-complete-list-span"
                    onMouseDown={() => {
                      setSelectedKeyword(keyword);
                      setFieldValue(field, keyword);
                    }}
                  >
                    {keyword}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {searchData.length > 0 && (
            <ul>
              {searchData.map((sd, i) => (
                <li key={i}>
                  <span
                    className="auto-complete-list-span"
                    onMouseDown={() => {
                      setSelectedKeyword(sd.title);
                      setFieldValue(field, sd.title);
                    }}
                  >
                    {sd.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default AutoCompleteList;
