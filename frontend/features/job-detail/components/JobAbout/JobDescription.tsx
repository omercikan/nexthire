import Markdown from "react-markdown";

const JobDescription = ({ description }: { description: string }) => {
  return (
    <div className="mb-12.5">
      {!description.toLowerCase().includes("iş hakkında") && (
        <h2 className="text-[#202124] text-lg font-medium mb-5">İş Hakkında</h2>
      )}

      <Markdown
        components={{
          p: ({ children }) => (
            <p className="text-[#696969] text-[15px]">{children}</p>
          ),
        }}
      >
        {description}
      </Markdown>
    </div>
  );
};

export default JobDescription;
