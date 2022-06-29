import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="143" r="125" />
        <rect x="0" y="285" rx="5" ry="5" width="280" height="27" />
        <rect x="0" y="325" rx="5" ry="5" width="280" height="113" />
        <rect x="3" y="465" rx="0" ry="0" width="272" height="39" />
        <rect x="4" y="465" rx="0" ry="0" width="243" height="30" />
        <rect x="0" y="451" rx="5" ry="5" width="280" height="45" />
    </ContentLoader>
);

export default PizzaSkeleton;
