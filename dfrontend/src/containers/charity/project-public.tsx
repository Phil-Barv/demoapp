import React, { useState } from 'react';
import ProjectCard from '../../components/project-card';

const ProjectBrowser = () => {
	
  return (
    <div>
        <h1>Hi Daniel!</h1>
        <p>Here are the community's most recent projects.</p>
        <ProjectCard
            id={21}
            name={"Project Name"}
            tags={["Gender","Recommended For You"]}
            image_path={process.env.PUBLIC_URL + "/assets/dummy_media/landfill.png"}
            description={"Help us manage the landfills in Somalia."}
            />
    </div>

  )
  
}

export default ProjectBrowser;