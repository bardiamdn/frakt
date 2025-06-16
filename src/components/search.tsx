const Search = () => {
  return (
    <div className=" relative w-[500px]">
      <div className="absolute top-1/2 left-[5px] -translate-y-1/2 p-[8px] rounded-full bg-icon-background">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0237 13.738L12.2017 10.9149C14.3132 8.09316 13.7375 4.09399 10.9158 1.98249C8.09409 -0.129014 4.09492 0.446724 1.98342 3.26842C-0.128083 6.09012 0.447654 10.0893 3.26935 12.2008C5.53598 13.8969 8.64914 13.8969 10.9158 12.2008L13.7389 15.0239C14.0937 15.3787 14.6689 15.3787 15.0236 15.0239C15.3784 14.6691 15.3784 14.0939 15.0236 13.7392L15.0237 13.738ZM7.1161 11.6559C4.6083 11.6559 2.57536 9.62296 2.57536 7.11517C2.57536 4.60737 4.6083 2.57443 7.1161 2.57443C9.62389 2.57443 11.6568 4.60737 11.6568 7.11517C11.6542 9.62183 9.62278 11.6532 7.1161 11.6559Z"
            fill="#818181"
            className="fill-icon"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search to filter results"
        aria-label="Search"
        className="bg-background shadow-xs rounded-full w-full h-10 pl-[50px] pr-[10px] border focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default Search;
