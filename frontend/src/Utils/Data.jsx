export const cardData = {
  cardOne: {
    title: "Slack-based incident management",
    description: "Get the right team members involved with powerful.",
    image: "https://betterstack.com/assets/v2/homepage-v3/playwright-da90a141aa737b2b175df959c34734ebd836ca672c60a7ba433586e8883b6e4c.png",
    // you will have to paste your own gitty app dashboard screenshot here
    isLandscape: true,
  },

  cardTwo: {
    title: "Slack-based incident management",
    description: "Get the right team members involved with powerful templated workflows directly in Slack and decrease your MTTR.",
    // you will have to paste your own gitty app dashboard screenshot here
    image: "https://betterstack.com/assets/v2/homepage-v3/slack-incident-management-89760017874b0521f94bf0ace9e256e8a852a5464b0fddd6d99f48782654ec74.jpg",
    isLandscape: false,
  },

  cardThree: {
    title: "Check your error history",
    description: "We record the API errors and take a screenshot of your app being down.",
    // you will have to paste your own gitty app dashboard screenshot here
    image: "https://betterstack.com/assets/v2/homepage-v3/screenshots-5a6556140e36b660792f31653e02f0a57c895eae10c01fa3452ee2d5e15bbab3.png",
    isLandscape: true,
  },

  cardFour: {
    title: "Slack-based incident management",
    description: "Get the right team members involved with powerful templated workflows directly in Slack and decrease your MTTR.",
    image: "https://betterstack.com/assets/v2/homepage-v3/phone-alert-6cc6490d1ab5c30eea5d34ae21a511262c45954b938e2f551c8554fec3cb10bc.jpg",
    // you will have to paste your own gitty app dashboard screenshot here

    isLandscape: false,
  },

}

export const metadata = {
  cardOne: {
    title: "Track Git Commit History",
    description: "Easily visualize the history of commits in your Git repositories with intuitive timelines.",
    image: "https://betterstack.com/assets/v2/homepage-v3/whitelabel-status-page-1b62518d02ddb069727079a47255f11afe2f77890f853c0b7673daede6642b72.png", // Replace with a relevant gitty app screenshot
    isLandscape: true,
  },

  cardTwo: {
    title: "Collaborative Branch Management",
    description: "Manage multiple branches efficiently and see real-time updates on collaborative efforts within your team.",
    image: "https://betterstack.com/assets/v2/homepage-v3/anomaly-detection-faa34ba05334a907780d43f42df9ebedfac460a7f6509482d555921dae82d13b.jpg", // Replace with a relevant gitty app screenshot
    isLandscape: false,
  },

  cardThree: {
    title: "Issue Tracking Integration",
    description: "Seamlessly link your code changes with issue tracking tools to stay on top of bug fixes and feature requests.",
    image: "https://betterstack.com/assets/v2/homepage-v3/collaboration-c51dfa81c9e79afbf3d3b14e3ca254fb802e89869f539892dd9337b34934a152.png", // Replace with a relevant gitty app screenshot
    isLandscape: true,
  },

  cardFour: {
    title: "Automated Code Review",
    description: "Automatically review and flag issues in your code before merging to ensure best practices and standards are followed.",
    image: "https://betterstack.com/assets/v2/homepage-v3/status-page-charts-012f9b6928d5f68d509475b285d8e64644ea8244d29e76cfaed686ad5bdf3e06.jpg", // Replace with a relevant gitty app screenshot
    isLandscape: false,
  },
}

export const isAuthenticated = () => !!localStorage.getItem("token");
