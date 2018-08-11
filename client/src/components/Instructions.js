import React from 'react';

const Instructions = () => (
  <div className="instructions-wrapper">
    <header className="instructions-header">Instructions go here</header>
    <div className="steps">
      <div className="step create">
        <h2 className="instruction-step-title">
          <i className="fa fa-foghorn" />
          1. CREATE A CAMPAIGN
        </h2>
        <div className="create-campaign-details">
          <div className="create-campaign-detail">
            <h3>Share your campaign</h3>
            <p>
              Print a flier, post it in a public place, like laundry or mail room, or share via
              social media
            </p>
          </div>
          <div className="create-campaign-detail">
            <h3>Time Feature</h3>
            <p>You can have extra time if needed</p>
          </div>
          <div className="create-campaign-detail">
            <h3>Tools</h3>
            <p>
              Access resources like recycling guidelines, tips for approaching your landlord, data
              documentation and more!
            </p>
          </div>
        </div>
        <div className="create-campaign-screenshot">
          <h3>Explore</h3>
          <p>Click on the map to explore other campaigns</p>
          <img alt="Screenshot of our Main Page" src="../static/assets/instructionScreenshot.png" />
        </div>
      </div>

      <div className="step recruit">
        <h2 className="instruction-step-title">
          <i className="fa fa-users" />
          2. RECRUIT SUPPORT FROM NEIGHBORS
        </h2>
      </div>

      <div className="step request">
        <h2 className="instruction-step-title">
          <i className="fa fa-blowhorn" />
          3. REQUEST RECYCLING FROM YOUR LANDLORD
        </h2>
      </div>

      <div className="step recycle">
        <h2 className="instruction-step-title">
          <i className="fa fa-recycle" />
          4. RECYCLE!
        </h2>
        <div className="recycling-guidelines">
          <h3>Recycling Guidelines</h3>
          <p>
            Congratulations for getting recyling! Best practices show that posting guidelines will
            help your neighbors reycle correctly. This will help your landlord, too!
          </p>
          <p>
            When a recycling bin is too contaminated, your complex will either given one week to
            clean out the recycling bin or will be charged extra to take it to the landfill as
            trash. Common contaminants in the recycling include plastic bags because they jamb the
            machine and disposable ware such as red solo cups, disposable cutlery, and disposable
            plates.
          </p>
        </div>
        <img
          alt="Recycling Guideline Images"
          src="https://www.colorado.edu/ecenter/sites/default/files/page/recycle_guidelines.jpg"
        />
        <img
          alt="Recycling Guideline Images"
          src="http://siouxfalls.org/-/media/Images/publicworks/environmental/2016-single-stream-do-not-recycle.ashx?h=52%25&w=40%25&la=en&hash=6E797D4DA35E0E45A5CB7322A09A967904677CD6"
        />
      </div>
    </div>
  </div>
);

export default Instructions;
