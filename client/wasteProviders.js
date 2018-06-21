const wasteProviders = [
  {
    name: 'Elite Roll-off Services',
    phone: '303-287-7800',
    email: 'info@eliterolloff.com'
  },
  {
    name: 'Curbside Roll-Off',
    phone: '303-343-7096',
    email: 'info@curbsidedatacontrol.com'
  },
  {
    name: 'College Hunks Hauling Junk',
    phone: '720-608-2600',
    email: 'StressFreeService@collegehunkshaulingjunk.com'
  },
  {
    name: 'Gone for Good',
    phone: '303-736-2387',
    email: 'info@goneforgoodstore.com'
  },
  {
    name: 'CWS Colorado, LLC',
    phone: '303-287-6655',
    email: 'jack@ateccolorado.com'
  },
  { name: 'Garbagio', phone: '303-274-1500', email: 'N/A' },
  {
    name: 'IT Refresh',
    phone: '970-797-2934',
    email: 'recycling@itrefresh.org'
  },
  {
    name: 'J-Dog',
    phone: '720-900-3693',
    email: 'bbrier@jdog.com'
  },
  {
    name: 'Fiore and Sons',
    phone: '303-747-4073',
    email: 'info@fioreandsons.com'
  },
  { name: 'Expert Disposal', phone: '303-814-1808', email: 'N/A' },
  {
    name: 'Home Builders Services',
    phone: '303-651-5705',
    email: 'hbsdispatch@cofence.com'
  },
  { name: 'Junk King', phone: '720-458-1398', email: 'N/A' },
  { name: 'Hoarder Squad', phone: '720-629-6288', email: 'N/A' },
  {
    name: 'Junkman Enterprises',
    phone: '303-777-4667',
    email: 'junkmandenver@gmail.com'
  },
  {
    name: 'Gorilla Demolition',
    phone: '303-697-1325',
    email: 'ashley@gorillademo.com'
  },
  {
    name: 'Mile High Roll-Off Waste Systems',
    phone: '303-460-1001',
    email: 'N/A'
  },
  {
    name: 'Junk Genius',
    phone: '303-388-7780',
    email: 'info@junkgenius.com'
  },
  {
    name: 'RCI Disposal',
    phone: '303-699-6005',
    email: 'dispatch@rci-disposal.com'
  },
  {
    name: 'Junk Be Gone',
    phone: '720-583-0979',
    email: 'pickup@junkbegonedenver.com'
  },
  {
    name: 'Jay’s Junk Removal',
    phone: '720-744-9900',
    email: 'N/A'
  },
  {
    name: 'Sam’s Mini Roll-Off Dumpsters',
    phone: '303-957-0737',
    email: 'N/A'
  },
  { name: 'METech Recycling', phone: '303-204-9685', email: 'N/A' },
  {
    name: 'Storjohann Trucking',
    phone: '303-327-2263',
    email: 'DansMRock@aol.com'
  },
  {
    name: 'McDonald Farm Enterprises, Inc.',
    phone: '303-442-6829',
    email: 'dispatch@mcdonaldfarmsinc.com'
  },
  { name: 'Rubbish Works', phone: '720-891-4296', email: 'N/A' },
  {
    name: 'Lies Waste System',
    phone: '303-286-6700',
    email: 'N/A'
  },
  {
    name: 'Vigils Concrete & Roll-off Service',
    phone: '303-807-4872',
    email: 'N/A'
  },
  {
    name: 'Total Disposal',
    phone: '303-374-0234',
    email: 'CustomerService@totaldisposalofdenver.com'
  },
  {
    name: 'Rocky Mountain Roll-off and Waste',
    phone: '303-478-4717',
    email: 'N/A'
  },
  { name: 'The Junk Trunk', phone: '303-815-0467', email: 'N/A' },
  {
    name: 'Republic Services',
    phone: '303-286-2429',
    email: 'N/A'
  },
  {
    name: 'Yellowbox Disposal Company',
    phone: '720-493-5569',
    email: 'info@yellowboxdisposal.com'
  },
  {
    name: 'WM Curbside',
    phone: '1-800-449-7587',
    email: 'atyourdoor@wm.com'
  },
  { name: 'Techno Rescue', phone: '303-482-2207', email: 'N/A' },
  {
    name: 'Western Roll Off',
    phone: '303 765-5633',
    email: 'karl@westernrolloff.com'
  },
  {
    name: 'SustainAbility',
    phone: '720.838.5907',
    email: 'info@sustainability-recycling.com'
  },
  {
    name: 'Waste Management',
    phone: '303-917-7068',
    email: 'cscolorado@wm.com'
  },
  {
    name: 'Waste Connections of Colorado',
    phone: '303-246-0627',
    email: 'N/A'
  },
  {
    name: 'Bellio Trucking Inc.',
    phone: '303-426-9629',
    email: 'N/A'
  },
  {
    name: 'American Disposal Services',
    phone: '303-288-5279',
    email: 'info@adsimail.com'
  },
  {
    name: 'Alpine Waste & Recycling',
    phone: '303-744-9881',
    email: 'srcaulk@proconnectpr.com'
  },
  {
    name: 'ABC Hauling Service',
    phone: '303-949-0894',
    email: 'antenna47@yahoo.com'
  },
  { name: 'Adams Roll Off', phone: '303-425-4606', email: 'N/A' },
  {
    name: 'Blue Star Recyclers',
    phone: '303-534-1667',
    email: 'sam@bluestarrecyclers.com'
  },
  {
    name: 'Blue Bear Waste Services',
    phone: '720-500-5282',
    email: 'info@bluebearwaste.com'
  },
  {
    name: 'Bin There Dump That Parker',
    phone: '720-851-7888',
    email: 'N/A'
  },
  {
    name: 'Benson Roll-off Services',
    phone: '303-650-1604',
    email: 'N/A'
  },
  {
    name: 'Bin There Dump That Denver',
    phone: '720-524-3727',
    email: 'denverwest@bintheredumpthat.com'
  },
  {
    name: 'Clear Intentions, LLC',
    phone: '303-993-8221',
    email: 'N/A'
  },
  { name: 'Clutter Trucker', phone: '720-982-7856', email: 'N/A' },
  {
    name: 'Brothers Waste Solution',
    phone: '303-574-3164',
    email: 'N/A'
  },
  {
    name: 'Box Brothers Roll-Off Services',
    phone: '303-465-2100',
    email: 'N/A'
  },
  {
    name: 'Bricker Wilson Construction Services',
    phone: '720-317-4212',
    email: 'info@BrickerWilson@com'
  },
  {
    name: 'Data Destruction',
    phone: '303-388-3282',
    email: 'info@data-destruction.com'
  },
  {
    name: 'Green City Waste & Recycling',
    phone: '720-644-8745',
    email: 'N/A'
  }
];

export default wasteProviders;
