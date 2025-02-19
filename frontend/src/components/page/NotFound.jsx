import React from "react";
import Typography from "antd/es/typography/Typography";
import '../../assets/css/404.css'

export default function NotFound() {
    return(
        <div className="not-found">
            <Typography.Title level={1} style={{fontSize: '400px', margin: '0'}}>404</Typography.Title>
            <Typography.Title level={5} style={{fontSize: '50px',margin: '0'}}>Not Found</Typography.Title>
            
        </div>
    )
}