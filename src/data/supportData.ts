import {
  Wifi,
  Tv,
  Smartphone,
  Phone,
  CreditCard,
  Bot,
  type LucideIcon,
} from 'lucide-react';

export type Page = 'home' | 'topic' | 'outage' | 'account' | 'billing' | 'search' | 'blog' | 'blog-post';

export interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface HelpArticle {
  id: string;
  question: string;
  answer: string[];
  helpful?: boolean;
}

export interface SupportTopic {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  articles: HelpArticle[];
}

export interface PopularTopic {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
}

export const categories: SupportCategory[] = [
  {
    id: 'internet',
    title: 'Internet',
    description: 'Troubleshoot your connection, manage WiFi, and boost speeds',
    icon: Wifi,
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'tv',
    title: 'Xfinity TV',
    description: 'Set up your X1 TV Box, manage channels, and fix viewing issues',
    icon: Tv,
    color: 'from-purple-700 to-purple-900',
  },
  {
    id: 'mobile',
    title: 'Xfinity Mobile',
    description: 'Manage your mobile lines, data, and device troubleshooting',
    icon: Smartphone,
    color: 'from-green-600 to-green-800',
  },
  {
    id: 'home-phone',
    title: 'Home Phone',
    description: 'Set up voicemail, call forwarding, and fix voice service issues',
    icon: Phone,
    color: 'from-teal-600 to-teal-800',
  },
  {
    id: 'billing',
    title: 'Account & Billing',
    description: 'View and pay your bill, manage auto-pay, and update your plan',
    icon: CreditCard,
    color: 'from-amber-600 to-amber-800',
  },
  {
    id: 'assistant',
    title: 'Xfinity Assistant',
    description: 'Get instant help from our virtual assistant, 24/7',
    icon: Bot,
    color: 'from-brand-red to-brand-red-dark',
  },
];

export const supportTopics: SupportTopic[] = [
  {
    id: 'internet-connectivity',
    categoryId: 'internet',
    title: 'Internet Connectivity',
    description: 'Fix slow speeds, connection drops, and no-service issues',
    articles: [
      {
        id: 'restart-modem',
        question: 'How do I restart my Xfinity modem or gateway?',
        answer: [
          'Restarting your modem is the most common way to fix internet issues. Here\'s how:',
          '1. Unplug the power cable from the back of your Xfinity Gateway.',
          '2. Wait at least 10 seconds for the device to fully power down.',
          '3. Plug the power cable back in.',
          '4. Wait 2–5 minutes for the gateway to fully restart and reconnect. The online light should turn solid white.',
          '5. Test your internet connection by opening a website on a connected device.',
          'You can also restart your modem remotely using the Xfinity app or by going to your Account page and selecting "Restart Device."',
          'Need more help? Call us at (+1) 866-240-3377 — our support team is available 24/7.',
        ],
      },
      {
        id: 'slow-internet',
        question: 'Why is my internet speed slower than expected?',
        answer: [
          'Several factors can affect your internet speed:',
          '1. Check if you\'re on the right plan — compare your speed test results to your subscribed plan speed at xfinity.com/speedtest.',
          '2. Move your Gateway to a central, elevated location away from walls and metal objects.',
          '3. Connect high-bandwidth devices (streaming, gaming) via Ethernet instead of WiFi.',
          '4. Check for bandwidth-hungry apps running in the background on connected devices.',
          '5. If using WiFi, ensure you\'re connected to the 5GHz band for speeds above 100 Mbps.',
          '6. Restart your Gateway — this often resolves temporary slowdowns.',
          'If speeds are still below your plan after these steps, there may be a service issue in your area. Check the Outage Status page or call us at (+1) 866-240-3377 for immediate assistance.',
        ],
      },
      {
        id: 'wifi-name',
        question: 'How do I change my WiFi network name and password?',
        answer: [
          'You can change your WiFi credentials through the Xfinity app or the admin tool:',
          'Using the Xfinity app:',
          '1. Open the Xfinity app and sign in.',
          '2. Go to Connect > WiFi.',
          '3. Tap "Edit WiFi Settings."',
          '4. Enter your new network name and/or password.',
          '5. Tap "Save" — your devices will need to reconnect with the new credentials.',
          'Using the admin tool:',
          '1. Open a web browser and go to 10.0.0.1.',
          '2. Sign in with username "admin" and your password (default is "password").',
          '3. Navigate to Gateway > Connection > WiFi.',
          '4. Edit your network name and password in the fields provided.',
          '5. Click "Save Settings."',
        ],
      },
      {
        id: 'no-connection',
        question: 'My internet isn\'t working at all — what should I do?',
        answer: [
          'If you have no internet connection, follow these steps in order:',
          '1. Check if there\'s an outage in your area by entering your ZIP code on the Outage Status page.',
          '2. Verify all cables are securely connected to your Gateway (power, coax, Ethernet).',
          '3. Restart your Gateway by unplugging it for 10 seconds, then plugging it back in.',
          '4. Check the status lights on your Gateway — a solid white light means it\'s online; a blinking red light means there\'s a problem.',
          '5. If the Gateway shows a blinking red light after restarting, there may be a physical line issue. Use the Xfinity Assistant to schedule a technician visit.',
          '6. If only one device is affected, try forgetting the WiFi network and reconnecting.',
          'Still having trouble? Call our support team at (+1) 866-240-3377 — we are here 24/7.',
        ],
      },
    ],
  },
  {
    id: 'internet-wifi',
    categoryId: 'internet',
    title: 'WiFi Management',
    description: 'Optimize your home WiFi network and manage connected devices',
    articles: [
      {
        id: 'wifi-coverage',
        question: 'How can I improve WiFi coverage throughout my home?',
        answer: [
          'To get the best WiFi coverage in your home:',
          '1. Place your Gateway in a central, elevated location — avoid basements and closets.',
          '2. Keep it away from thick walls, metal objects, and electronics that cause interference (microwaves, baby monitors).',
          '3. Consider adding xFi Pods to extend coverage to hard-to-reach areas.',
          '4. Ensure your Gateway firmware is up to date — updates are automatic but a restart can help.',
          '5. For larger homes (3,000+ sq ft), a mesh WiFi setup with multiple pods gives the best coverage.',
          'You can check your WiFi signal strength in the Xfinity app under Connect > WiFi > View Details.',
        ],
      },
      {
        id: 'connected-devices',
        question: 'How do I see and manage devices connected to my WiFi?',
        answer: [
          'You can manage all connected devices through the Xfinity app:',
          '1. Open the Xfinity app and sign in.',
          '2. Go to Connect > Devices.',
          '3. You\'ll see a list of all devices currently or recently connected to your network.',
          '4. Tap any device to pause its connection, rename it, or assign it to a profile.',
          '5. To remove a device, tap "Forget Device" — it will need the WiFi password to reconnect.',
          'You can also set up Profiles to group devices (e.g., "Kids" devices) and pause them all at once.',
        ],
      },
      {
        id: 'parental-controls',
        question: 'How do I set up parental controls on my WiFi?',
        answer: [
          'xFi parental controls let you manage what your family can access:',
          '1. Open the Xfinity app and sign in.',
          '2. Go to Connect > Profiles.',
          '3. Create a profile for each family member and assign their devices.',
          '4. Tap a profile to set restrictions:',
          '   • Pause: temporarily block internet access (bedtime, homework time).',
          '   • Web Filters: block categories like adult content, social media, or gambling.',
          '   • Time Limits: set daily screen time limits.',
          '5. Changes apply immediately to all devices in that profile.',
          'You can also view browsing history for each profile to monitor activity.',
        ],
      },
    ],
  },
  {
    id: 'tv-x1-setup',
    categoryId: 'tv',
    title: 'X1 TV Box Setup',
    description: 'Install and activate your X1 TV Box and voice remote',
    articles: [
      {
        id: 'activate-x1',
        question: 'How do I activate my X1 TV Box?',
        answer: [
          'To activate your X1 TV Box:',
          '1. Connect the coax cable from the wall to the X1 Box.',
          '2. Connect the HDMI cable from the X1 Box to your TV.',
          '3. Plug in the power cable and turn on the TV.',
          '4. Tune your TV to the correct HDMI input.',
          '5. The activation screen will appear automatically — follow the on-screen prompts.',
          '6. You\'ll need your Xfinity account number or phone number associated with the account.',
          '7. Once activated, your channels will download. This can take 5–15 minutes.',
          'If activation doesn\'t start automatically, call us at (+1) 866-240-3377 or use the Xfinity app to activate.',
        ],
      },
      {
        id: 'pair-remote',
        question: 'How do I pair my Xfinity Voice Remote?',
        answer: [
          'Pairing your voice remote is quick and easy:',
          '1. Make sure your X1 TV Box is turned on.',
          '2. Press and hold the Setup button (the small button at the top of the remote) until the LED at the top changes from red to green.',
          '3. Press the Xfinity button on the remote.',
          '4. Follow the on-screen instructions to complete pairing.',
          '5. Once paired, you can use voice commands like "Show me action movies" or "What\'s on NBC?"',
          'To re-pair or if the remote isn\'t working, replace the batteries and repeat these steps.',
        ],
      },
      {
        id: 'no-signal',
        question: 'My TV says "No Signal" — what do I do?',
        answer: [
          'If you see a "No Signal" message on your TV:',
          '1. Check that your TV is on the correct HDMI input. Use your TV remote (not the Xfinity remote) to cycle through inputs.',
          '2. Verify the HDMI cable is firmly connected at both ends (TV and X1 Box).',
          '3. Check that the X1 Box is powered on — the power light should be on.',
          '4. Try unplugging the X1 Box for 10 seconds, then plugging it back in.',
          '5. If using a different cable type (component, coax), verify those connections.',
          '6. Try a different HDMI cable to rule out a faulty cable.',
          'If none of these work, the X1 Box may need to be replaced. Use the Xfinity Assistant to request a replacement, or call us at (+1) 866-240-3377.',
        ],
      },
    ],
  },
  {
    id: 'tv-channels',
    categoryId: 'tv',
    title: 'Channel & Programming',
    description: 'Manage your channel lineup, add premium channels, and fix missing channels',
    articles: [
      {
        id: 'missing-channels',
        question: 'Why are some of my channels missing?',
        answer: [
          'If channels are missing from your lineup:',
          '1. First, try restarting your X1 TV Box — unplug for 10 seconds, plug back in, and wait for it to reload.',
          '2. Check if your subscription includes those channels. Go to your Account page to view your channel lineup.',
          '3. If you recently changed your plan, some channels may have been removed. You can add them back by upgrading your package.',
          '4. Check for any billing issues that might have caused a service interruption.',
          '5. If only certain channels are missing, there may be a regional broadcast issue. Check the Outage Status page.',
          '6. Try tuning to the channel by entering the channel number directly on the remote.',
        ],
      },
      {
        id: 'add-premium',
        question: 'How do I add premium channels like HBO or Showtime?',
        answer: [
          'You can add premium channels at any time:',
          '1. Go to xfinity.com/learn/channel-lineup and sign in.',
          '2. Browse available premium add-ons (HBO Max, Showtime, Starz, EPIX, etc.).',
          '3. Click "Add" next to the channels you want.',
          '4. Review the monthly cost and confirm.',
          '5. The channels will appear on your X1 Box within minutes — no restart needed.',
          'Alternatively, you can add channels through the Xfinity app under Manage > Add Channels, or say "Add HBO" into your Xfinity Voice Remote.',
          'You can cancel premium channels anytime without penalty.',
        ],
      },
    ],
  },
  {
    id: 'mobile-data',
    categoryId: 'mobile',
    title: 'Data & Plans',
    description: 'Manage your mobile data, change plans, and track usage',
    articles: [
      {
        id: 'check-data',
        question: 'How do I check my Xfinity Mobile data usage?',
        answer: [
          'You can check your data usage at any time:',
          '1. Open the Xfinity app and sign in.',
          '2. Go to Mobile > Data Usage.',
          '3. You\'ll see a breakdown of data used by each line on your account.',
          '4. The usage is updated in near real-time.',
          '5. You can set data alerts to notify you when a line reaches a certain amount.',
          'On the By the Gig plan, you only pay for the data you use. On the Unlimited plan, data is unlimited but may be deprioritized after 20GB during congestion.',
        ],
      },
      {
        id: 'change-plan',
        question: 'How do I switch between By the Gig and Unlimited?',
        answer: [
          'You can change your mobile plan anytime:',
          '1. Go to xfinity.com/mobile or open the Xfinity app.',
          '2. Sign in to your account.',
          '3. Navigate to Mobile > Lines.',
          '4. Select the line you want to change.',
          '5. Click "Change Plan."',
          '6. Choose By the Gig (pay for what you use) or Unlimited.',
          '7. Confirm the change.',
          'Changes take effect at the start of your next billing cycle. You can mix and match plans across lines on your account.',
        ],
      },
    ],
  },
  {
    id: 'mobile-device',
    categoryId: 'mobile',
    title: 'Device Troubleshooting',
    description: 'Fix phone issues, activate new devices, and manage your mobile lines',
    articles: [
      {
        id: 'activate-phone',
        question: 'How do I activate a new phone on Xfinity Mobile?',
        answer: [
          'Activating a new device takes about 10–15 minutes:',
          '1. Download the Xfinity app on your new phone.',
          '2. Sign in with your Xfinity account credentials.',
          '3. The app will detect your new device — follow the on-screen prompts.',
          '4. If bringing your own device, ensure it\'s unlocked and compatible with Xfinity Mobile.',
          '5. Choose or confirm your phone number and data plan.',
          '6. Wait for activation to complete — your phone will restart.',
          '7. Test by making a call and sending a text.',
          'If activation fails, ensure you have a Wi-Fi connection and try again. For eSIM devices, follow the specific eSIM instructions in the app.',
        ],
      },
      {
        id: 'no-service-mobile',
        question: 'My phone shows "No Service" — what should I do?',
        answer: [
          'If your Xfinity Mobile phone has no service:',
          '1. Check for outages in your area on the Outage Status page.',
          '2. Toggle Airplane Mode on for 10 seconds, then off — this forces a network reconnect.',
          '3. Restart your phone.',
          '4. Check that your SIM card is properly inserted (if applicable).',
          '5. Go to Settings > Cellular and ensure Cellular Data is turned on.',
          '6. If you recently activated, wait up to 30 minutes for full provisioning.',
          '7. If the issue persists, you may need a new SIM card or eSIM. Contact Xfinity Mobile support through the Xfinity Assistant or call us at (+1) 866-240-3377.',
        ],
      },
    ],
  },
  {
    id: 'home-phone-setup',
    categoryId: 'home-phone',
    title: 'Home Phone Setup',
    description: 'Set up voicemail, call forwarding, and manage calling features',
    articles: [
      {
        id: 'setup-voicemail',
        question: 'How do I set up my Xfinity voicemail?',
        answer: [
          'Setting up voicemail for your Xfinity home phone:',
          '1. From your home phone, dial *99.',
          '2. When prompted, enter your temporary PIN (the last 4 digits of your phone number).',
          '3. Follow the voice prompts to create a new PIN (4–15 digits).',
          '4. Record your name when prompted.',
          '5. Record a personal greeting or select the default greeting.',
          '6. Your voicemail is now set up and ready to receive messages.',
          'To check voicemail remotely, dial your home number, press * during the greeting, then enter your PIN.',
        ],
      },
      {
        id: 'call-forwarding',
        question: 'How do I set up call forwarding?',
        answer: [
          'To forward your Xfinity home phone calls to another number:',
          '1. From your home phone, dial *72.',
          '2. Enter the 10-digit phone number you want calls forwarded to.',
          '3. Wait for the confirmation tone, then hang up.',
          '4. All incoming calls will now ring at the forwarded number.',
          'To turn off call forwarding:',
          '1. Dial *73 from your home phone.',
          '2. Listen for the confirmation tone.',
          '3. Hang up — calls will now ring at your home phone as normal.',
          'You can also manage call forwarding through the Xfinity app under Phone > Calling Features.',
        ],
      },
    ],
  },
  {
    id: 'billing-payments',
    categoryId: 'billing',
    title: 'Payments & Billing',
    description: 'Pay your bill, set up auto-pay, and understand charges',
    articles: [
      {
        id: 'pay-bill',
        question: 'How do I pay my Xfinity bill?',
        answer: [
          'There are several convenient ways to pay your Xfinity bill:',
          'Online: Go to xfinity.com/pay or use the Xfinity app. Sign in, go to Billing > Pay Bill, and enter your payment details.',
          'Auto-Pay: Enroll in auto-pay to have your bill paid automatically each month from your preferred payment method. Go to Billing > Auto-Pay to set it up.',
          'By Phone: Call us at (+1) 866-240-3377 and follow the payment prompts. Have your account number ready.',
          'By Mail: Send a check or money order to the address on your billing statement. Include your account number on the check.',
          'In Person: Visit an Xfinity Store or an authorized payment location (like Western Union or CheckFreePay).',
          'A payment confirmation will be sent to your email after each successful payment.',
        ],
      },
      {
        id: 'autopay',
        question: 'How do I set up or manage auto-pay?',
        answer: [
          'Auto-pay ensures your bill is always paid on time:',
          '1. Open the Xfinity app or go to xfinity.com.',
          '2. Sign in and go to Billing > Auto-Pay.',
          '3. Click "Enroll in Auto-Pay."',
          '4. Select your preferred payment method (bank account, debit card, or credit card).',
          '5. Choose your payment date — you can select any day from the 1st to the 28th of the month.',
          '6. Review and confirm.',
          'Your bill will be automatically paid on your selected date each month. You\'ll receive an email reminder 10 days before the payment is processed.',
          'To pause or cancel auto-pay, go to Billing > Auto-Pay and toggle it off.',
        ],
      },
      {
        id: 'understand-bill',
        question: 'How do I understand the charges on my bill?',
        answer: [
          'Your Xfinity bill includes several sections:',
          '1. Monthly Service Charges: This shows the cost of each service on your account (Internet, TV, Mobile, Phone).',
          '2. Equipment Charges: Rental fees for your Gateway, TV Boxes, and other equipment.',
          '3. Add-Ons & Premiums: Any premium channels, xFi Pods, or additional services.',
          '4. Taxes & Fees: Government-mandated taxes, regulatory fees, and franchise costs. These vary by location.',
          '5. One-Time Charges: Installation fees, pay-per-view, or one-time purchases.',
          '6. Adjustments: Credits, promotional discounts, or previous balance carried over.',
          'To see a detailed breakdown, go to Billing > View Bill in the Xfinity app. You can also download past bills as PDF.',
        ],
      },
    ],
  },
  {
    id: 'billing-account',
    categoryId: 'billing',
    title: 'Account Management',
    description: 'Update your plan, transfer service, and manage account settings',
    articles: [
      {
        id: 'change-plan',
        question: 'How do I upgrade or change my Xfinity plan?',
        answer: [
          'You can change your plan at any time:',
          '1. Go to xfinity.com/learn or open the Xfinity app.',
          '2. Sign in to your account.',
          '3. Navigate to Manage > Change Plan.',
          '4. Browse available plans and packages.',
          '5. Select the plan you want and review the new monthly price.',
          '6. Click "Confirm Changes."',
          'Changes typically take effect immediately for upgrades. Downgrades may take effect at the start of your next billing cycle.',
          'Some plan changes may require a new contract term. Review the terms before confirming.',
        ],
      },
      {
        id: 'transfer-service',
        question: 'How do I transfer my Xfinity service to a new address?',
        answer: [
          'Moving? Transfer your Xfinity service in a few steps:',
          '1. Go to xfinity.com/moving or open the Xfinity app.',
          '2. Sign in and select "Transfer Service."',
          '3. Enter your new address to check service availability.',
          '4. Choose your move date and confirm which services you want to transfer.',
          '5. If your current equipment is compatible, you\'ll keep it. If not, new equipment will be shipped.',
          '6. Schedule a professional installation if needed, or choose self-installation.',
          '7. Review and confirm the transfer.',
          'It\'s best to schedule your transfer at least 7 days before your move. There is typically no transfer fee for existing customers.',
        ],
      },
    ],
  },
];

export const popularTopics: PopularTopic[] = [
  {
    id: 'restart-modem',
    title: 'Restart your modem or gateway',
    category: 'Internet',
    icon: Wifi,
  },
  {
    id: 'wifi-name',
    title: 'Change your WiFi name and password',
    category: 'Internet',
    icon: Wifi,
  },
  {
    id: 'pay-bill',
    title: 'Pay your Xfinity bill',
    category: 'Billing',
    icon: CreditCard,
  },
  {
    id: 'parental-controls',
    title: 'Set up parental controls',
    category: 'Internet',
    icon: Wifi,
  },
  {
    id: 'activate-x1',
    title: 'Activate your X1 TV Box',
    category: 'Xfinity TV',
    icon: Tv,
  },
  {
    id: 'missing-channels',
    title: 'Fix missing TV channels',
    category: 'Xfinity TV',
    icon: Tv,
  },
];

export interface AccountInfo {
  name: string;
  email: string;
  accountId: string;
  address: string;
  plan: string;
  services: string[];
  balance: number;
  dueDate: string;
  autopay: boolean;
}

export const accountInfo: AccountInfo = {
  name: 'Jordan Smith',
  email: 'jordan.smith@email.com',
  accountId: '8901234567',
  address: '456 Maple Avenue, Apt 3B, Portland, OR 97201',
  plan: 'Xfinity Choice Double Play',
  services: ['Internet — Gigabit (1200 Mbps)', 'Xfinity TV — Popular TV (125+ channels)'],
  balance: 142.83,
  dueDate: 'September 5, 2026',
  autopay: true,
};

export interface BillBreakdown {
  label: string;
  amount: number;
  type: 'service' | 'equipment' | 'addon' | 'tax' | 'adjustment';
}

export const billBreakdown: BillBreakdown[] = [
  { label: 'Internet — Gigabit (1200 Mbps)', amount: 89.99, type: 'service' },
  { label: 'Xfinity TV — Popular TV (125+ channels)', amount: 70.00, type: 'service' },
  { label: 'Xfinity Gateway Rental', amount: 14.00, type: 'equipment' },
  { label: 'X1 TV Box Rental (2 boxes)', amount: 10.00, type: 'equipment' },
  { label: 'HBO Max Add-On', amount: 15.99, type: 'addon' },
  { label: 'Promotional Discount', amount: -30.00, type: 'adjustment' },
  { label: 'Federal, State & Local Taxes', amount: 18.52, type: 'tax' },
  { label: 'Regulatory Cost Recovery Fee', amount: 2.50, type: 'tax' },
  { label: 'Franchise Fee', amount: 6.50, type: 'tax' },
  { label: 'Broadcast TV Fee', amount: 10.83, type: 'tax' },
];

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  quickReplies?: string[];
}

export const chatSuggestions: string[] = [
  'Check for outages',
  'Pay my bill',
  'Restart my modem',
  'Talk to an agent',
];

export interface ChatReply {
  keywords: string[];
  reply: string;
  followUps?: string[];
}

export const chatReplies: ChatReply[] = [
  {
    keywords: ['outage', 'outages', 'down', 'no service', 'no internet'],
    reply:
      "I can check for outages in your area right now. Can you provide your ZIP code? You can also check the Outage Status page for real-time updates. Currently, there are no reported outages in the Portland area. If you're experiencing an issue, I can help troubleshoot.",
    followUps: ['Restart my modem', 'Talk to an agent'],
  },
  {
    keywords: ['pay', 'bill', 'payment', 'autopay', 'auto pay'],
    reply:
      "Your current balance is $142.83, due on September 5, 2026. You're enrolled in Auto-Pay, so your bill will be paid automatically on the due date. You can also make a one-time payment by going to the Billing page. Would you like me to help with anything else?",
    followUps: ['View my bill details', 'Change autopay settings'],
  },
  {
    keywords: ['restart', 'reboot', 'reset', 'modem', 'gateway'],
    reply:
      "I can send a restart signal to your modem remotely. This takes about 5 minutes. During the restart, your internet will be briefly unavailable. Would you like me to send the restart signal now? You can also restart manually by unplugging your Gateway for 10 seconds and plugging it back in.",
    followUps: ['Send restart signal', 'No, thanks'],
  },
  {
    keywords: ['agent', 'human', 'representative', 'person', 'talk to'],
    reply:
      "I can connect you with a live agent. Our support team is available 24/7. Current estimated wait time is about 4 minutes. Would you like me to transfer you? You can also call (+1) 866-240-3377 to speak with someone directly.",
    followUps: ['Yes, transfer me', 'No, keep chatting'],
  },
  {
    keywords: ['wifi', 'password', 'network name', 'wifi name'],
    reply:
      "To change your WiFi name or password, open the Xfinity app and go to Connect > WiFi > Edit WiFi Settings. You can also visit 10.0.0.1 in a web browser and log in with username 'admin'. Need help with anything else?",
    followUps: ['Restart my modem', 'Check for outages'],
  },
  {
    keywords: ['slow', 'speed', 'slow internet', 'lag', 'buffering'],
    reply:
      "Slow internet can be frustrating. Here are a few things to try: 1) Restart your Gateway. 2) Move your Gateway to a central location. 3) Connect heavy-use devices with Ethernet. 4) Check if you're on the 5GHz WiFi band. If speeds are still slow after that, there may be a service issue. Would you like me to check for outages?",
    followUps: ['Check for outages', 'Restart my modem', 'Talk to an agent'],
  },
  {
    keywords: ['tv', 'channel', 'channels', 'missing', 'no signal'],
    reply:
      "For TV issues, try restarting your X1 TV Box first — unplug it for 10 seconds and plug it back in. If channels are missing, check your subscription on the Account page. If you see 'No Signal,' make sure your TV is on the correct HDMI input. Would you like more detailed troubleshooting steps?",
    followUps: ['Show me troubleshooting steps', 'Talk to an agent'],
  },
  {
    keywords: ['mobile', 'phone', 'cell', 'data', 'cellular'],
    reply:
      "For Xfinity Mobile support, you can check your data usage in the Xfinity app under Mobile > Data Usage. If you're having service issues, try toggling Airplane Mode or restarting your device. Need help with something specific?",
    followUps: ['Check data usage', 'Talk to an agent'],
  },
  {
    keywords: ['hello', 'hi', 'hey', 'help', 'start'],
    reply:
      "Hi there! I'm the Xfinity Assistant. I can help with outages, billing, technical support, and more. What can I do for you today?",
    followUps: chatSuggestions,
  },
];

export const defaultChatReply =
  "I understand you need help with that. Let me see what I can find. For this specific issue, I'd recommend checking our help articles on the Support page, or I can connect you with a live agent who can assist further. You can also call us at (+1) 866-240-3377. What would you prefer?";

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  serviceType: string;
  avatarColor: string;
}

export const customerReviews: CustomerReview[] = [
  {
    id: 'rev1',
    name: 'Marcus T.',
    location: 'Denver, CO',
    rating: 5,
    date: 'August 14, 2026',
    title: 'Blazing fast internet and great support',
    text: "Switched to Xfinity Gigabit last month and honestly couldn't be happier. Speeds are exactly what they promised — I get 1150 Mbps down on a wired connection. Had one hiccup during setup and the rep on the phone walked me through it in like five minutes. The Xfinity app makes it super easy to manage everything from my phone.",
    serviceType: 'Internet',
    avatarColor: 'from-blue-500 to-blue-700',
  },
  {
    id: 'rev2',
    name: 'Sarah K.',
    location: 'Chicago, IL',
    rating: 4,
    date: 'August 9, 2026',
    title: 'TV setup was a breeze',
    text: "Got the X1 TV box installed last weekend. The self-install kit was straightforward — literally plug and play. The voice remote is kind of amazing, my kids use it to search for shows by just talking. Knocked off one star because it took a little while to get all my channels to load, but once they did everything's been solid.",
    serviceType: 'Xfinity TV',
    avatarColor: 'from-purple-500 to-purple-700',
  },
  {
    id: 'rev3',
    name: 'Diego R.',
    location: 'Houston, TX',
    rating: 5,
    date: 'August 3, 2026',
    title: 'Mobile saved me a ton of money',
    text: "I was paying almost $90 a month for two lines with my old carrier. Switched to Xfinity Mobile and now I'm paying around $30 total on the By the Gig plan. Coverage is just as good since it uses Verizon's network. The activation process was painless too, took maybe 15 minutes per phone.",
    serviceType: 'Xfinity Mobile',
    avatarColor: 'from-green-500 to-green-700',
  },
  {
    id: 'rev4',
    name: 'Jennifer L.',
    location: 'Seattle, WA',
    rating: 4,
    date: 'July 28, 2026',
    title: 'Reliable service, wish the bill was lower',
    text: "Been a customer for about three years now. Internet has been rock solid — maybe two outages total in that time, both fixed within an hour. The xFi parental controls are great for managing my kids' screen time. Only complaint is the price creeps up after the promo period ends. Wish there was more transparency on that front.",
    serviceType: 'Internet',
    avatarColor: 'from-teal-500 to-teal-700',
  },
  {
    id: 'rev5',
    name: 'Robert H.',
    location: 'Atlanta, GA',
    rating: 5,
    date: 'July 22, 2026',
    title: 'Outage was fixed faster than expected',
    text: "We had a big storm roll through and lost internet around 9 PM. I checked the outage map on the Xfinity site and saw they were already aware of it. Got a text update when service was restored at 11:30 PM — way faster than I expected. The notification system actually works, which is more than I can say for my old provider.",
    serviceType: 'Internet',
    avatarColor: 'from-amber-500 to-amber-700',
  },
  {
    id: 'rev6',
    name: 'Aisha M.',
    location: 'Philadelphia, PA',
    rating: 5,
    date: 'July 15, 2026',
    title: 'The chat assistant is surprisingly helpful',
    text: "I needed to reset my modem at 2 AM before a big work presentation and didn't want to wait on hold. Used the Xfinity Assistant chat and it walked me through the whole restart process step by step. Got my internet back up in about 10 minutes. Honestly better than calling in for something that simple.",
    serviceType: 'Customer Support',
    avatarColor: 'from-brand-red to-brand-red-dark',
  },
  {
    id: 'rev7',
    name: 'Tom B.',
    location: 'Phoenix, AZ',
    rating: 4,
    date: 'July 8, 2026',
    title: 'Good bundle deal for the family',
    text: "Signed up for the Double Play with Internet and TV. The bundle pricing saved us about $40 a month compared to what we were paying separately. Installation tech was on time and professional, had everything up and running in under an hour. The guide interface on the X1 box takes some getting used to but it's fine once you learn it.",
    serviceType: 'Bundles',
    avatarColor: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 'rev8',
    name: 'Lisa P.',
    location: 'Minneapolis, MN',
    rating: 5,
    date: 'June 30, 2026',
    title: 'xFi Pods eliminated my dead zones',
    text: "Our house is pretty spread out and the WiFi would barely reach the back bedrooms. Added three xFi Pods and now we get full bars everywhere — even out on the back patio. Setup was literally just plugging them in and the app did the rest. Totally worth it if you have a larger home.",
    serviceType: 'Internet',
    avatarColor: 'from-pink-500 to-pink-700',
  },
  {
    id: 'rev9',
    name: 'Kevin W.',
    location: 'Tampa, FL',
    rating: 4,
    date: 'June 24, 2026',
    title: 'Auto-pay makes life easier',
    text: "Set up auto-pay the day I signed up and haven't thought about my bill since. Get an email ten days before it processes so there are no surprises. Also like that I can switch between my bank account and card depending on what's going on that month. Simple stuff but it works.",
    serviceType: 'Billing',
    avatarColor: 'from-cyan-500 to-cyan-700',
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  avatarColor: string;
  content: BlogSection[];
}

export interface BlogSection {
  type: 'paragraph' | 'heading' | 'list' | 'numbered' | 'callout' | 'quote';
  text?: string;
  items?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'how-to-escalate-issue-with-xfinity',
    title: 'How Do I Escalate an Issue with Xfinity?',
    excerpt: 'When your support ticket goes nowhere, here is the step-by-step playbook to escalate your Xfinity complaint and actually get results.',
    category: 'Customer Support',
    author: 'Rachel Donovan',
    authorRole: 'Consumer Advocacy Writer',
    date: 'August 18, 2026',
    readTime: '7 min read',
    avatarColor: 'from-brand-red to-brand-red-dark',
    content: [
      {
        type: 'paragraph',
        text: "You have called Xfinity three times. You have chatted with the Xfinity Assistant twice. You have rebooted your modem more times than you can count, and the problem is still there. Sound familiar? Escalating an issue with a major internet provider can feel like shouting into the void, but there is a structured way to do it that actually works. Here is the exact playbook we recommend.",
      },
      {
        type: 'heading',
        text: 'Step 1: Document Everything Before You Pick Up the Phone',
      },
      {
        type: 'paragraph',
        text: "Before you escalate, get your facts in order. Nothing slows down a support call faster than not having your account details ready. Write down your account number, the date the issue started, what troubleshooting you have already tried, and any ticket or reference numbers from previous calls. If you have screenshots of error messages or speed test results, have them ready too.",
      },
      {
        type: 'callout',
        text: "Pro tip: Keep a simple log — date, time, who you spoke with, and what they said. If you need to escalate further, this log becomes your strongest evidence.",
      },
      {
        type: 'heading',
        text: 'Step 2: Call the Dedicated Support Line',
      },
      {
        type: 'paragraph',
        text: "Start by calling Xfinity support at (+1) 866-240-3377. This is the fastest way to reach a live representative. When the automated system picks up, say \"representative\" or press 0 to bypass the menu. Once connected, calmly explain that you have already tried the standard troubleshooting steps and need to speak with a supervisor or a retention specialist.",
      },
      {
        type: 'numbered',
        items: [
          'Dial (+1) 866-240-3377 and say \"representative\" to skip the automated menu.',
          'Explain your issue briefly and mention that you have already completed basic troubleshooting.',
          'Politely request to be transferred to a supervisor or advanced support.',
          'Provide your case log — dates, ticket numbers, and what previous agents told you.',
          'Ask for a specific resolution and a timeline for when it will happen.',
        ],
      },
      {
        type: 'heading',
        text: 'Step 3: Use the Xfinity App and Online Chat',
      },
      {
        type: 'paragraph',
        text: "If you prefer not to call, the Xfinity app and the online Xfinity Assistant both have escalation paths. In the app, go to Support > Contact Us and select your issue category. The chat can connect you to a live agent who can create a ticket and flag it for follow-up. Ask the agent to assign a \"case manager\" — this is an internal designation that means your issue gets tracked end-to-end instead of starting over each time you contact support.",
      },
      {
        type: 'heading',
        text: 'Step 4: Request a Supervisor orRetention Specialist',
      },
      {
        type: 'paragraph',
        text: "Front-line agents have limited authority. If they cannot resolve your issue, ask specifically for a supervisor. If the supervisor cannot help, ask for the retention department — also called the loyalty team. Retention specialists have more flexibility to offer credits, free service months, fee waivers, or expedited technician visits to keep you as a customer.",
      },
      {
        type: 'quote',
        text: "\"I was getting nowhere for two weeks. The moment I asked for the retention department, suddenly they could schedule a technician the next day and credit my account for the downtime.\" — Marcus T., Denver, CO",
      },
      {
        type: 'heading',
        text: 'Step 5: File a Complaint with the FCC',
      },
      {
        type: 'paragraph',
        text: "If you have exhausted Xfinity's internal escalation path and still have no resolution, filing a complaint with the Federal Communications Commission (FCC) is one of the most effective ways to get attention. ISPs are required to respond to FCC complaints within 30 days, and they take them seriously because unresolved complaints can affect their regulatory standing.",
      },
      {
        type: 'numbered',
        items: [
          'Go to consumercomplaints.fcc.gov and select \"File a Complaint.\"',
          'Choose \"Internet\" as the service type.',
          'Provide your account details, the issue, and what you have already done to resolve it.',
          'Submit — Xfinity will be notified and assigned a deadline to respond directly to you.',
        ],
      },
      {
        type: 'heading',
        text: 'Step 6: Contact the Better Business Bureau',
      },
      {
        type: 'paragraph',
        text: "Filing a BBB complaint is another effective escalation channel. Comcast/Xfinity monitors BBB complaints closely and has a dedicated team that responds. Go to bbb.org, search for Comcast, and file a complaint describing your issue and the resolution you want. You will typically get a response within 3–5 business days from someone higher up the chain.",
      },
      {
        type: 'heading',
        text: 'Step 7: Reach Out on Social Media',
      },
      {
        type: 'paragraph',
        text: "Companies respond quickly to public complaints because they are visible. Tweet at @Xfinity or @ComcastCares with a brief description of your issue (do not include personal account details). The social media team is usually faster and more empowered than front-line phone support. You can also post on the Xfinity subreddit (r/Comcast_Xfinity) where official representatives sometimes chime in.",
      },
      {
        type: 'callout',
        text: "Need help right now? Call (+1) 866-240-3377 to speak with a support agent directly. Our team is available 24/7.",
      },
      {
        type: 'paragraph',
        text: "Escalating an issue is not about being angry or demanding — it is about being organized and knowing which channels to use. Start with the phone call, work your way up to a supervisor, and if that fails, use external complaint channels like the FCC and BBB. The combination of documentation plus public accountability is what gets results.",
      },
    ],
  },
  {
    id: 'comcast-email-vs-xfinity-email',
    title: 'Is Comcast Email and Xfinity Email the Same?',
    excerpt: 'The short answer is yes — but there is a lot more to know about how your email works, what changed, and how to access it today.',
    category: 'Account & Email',
    author: 'James Park',
    authorRole: 'Technical Writer',
    date: 'August 15, 2026',
    readTime: '5 min read',
    avatarColor: 'from-blue-500 to-blue-700',
    content: [
      {
        type: 'paragraph',
        text: "If you have been a Comcast customer for a while, you probably have an email address ending in @comcast.net. At some point, you may have noticed everything being rebranded as \"Xfinity.\" So what happened to your Comcast email? Did it change? Do you need a new address? Let us clear up the confusion.",
      },
      {
        type: 'heading',
        text: 'The Short Answer: Yes, They Are the Same',
      },
      {
        type: 'paragraph',
        text: "Comcast email and Xfinity email are the same thing. Your @comcast.net email address still works exactly the same way it always has. The \"Xfinity\" brand is simply the consumer-facing name Comcast uses for its internet, TV, mobile, and phone services. Comcast is the parent company; Xfinity is the product brand. Under the hood, it is all the same infrastructure and the same email system.",
      },
      {
        type: 'callout',
        text: "Your @comcast.net email address has not changed and will not change. You do not need to create a new Xfinity email address.",
      },
      {
        type: 'heading',
        text: 'How to Access Your Comcast/Xfinity Email',
      },
      {
        type: 'paragraph',
        text: "There are several ways to check your email, and they all work with your existing @comcast.net address:",
      },
      {
        type: 'numbered',
        items: [
          'Web: Go to connect.xfinity.com and sign in with your Comcast ID (your email address) and password.',
          'Xfinity App: Open the Xfinity app, tap the menu icon, and select \"Email\" to read and send messages.',
          'Email Client: You can use Outlook, Apple Mail, Thunderbird, or any standard email app. The IMAP settings are: incoming server imap.comcast.net (port 993, SSL), outgoing server smtp.comcast.net (port 587, TLS).',
          'Mobile Browser: Bookmark connect.xfinity.com on your phone browser for quick access without the app.',
        ],
      },
      {
        type: 'heading',
        text: 'What Is a Comcast ID vs. an Xfinity ID?',
      },
      {
        type: 'paragraph',
        text: "Your Comcast ID — also called your Xfinity ID — is the username you use to sign in to your account, the Xfinity app, your email, and other Xfinity services. It is typically your @comcast.net email address, but it can also be a mobile number or a custom username you created. All three options are linked to the same account.",
      },
      {
        type: 'paragraph',
        text: "If you are not sure what your Comcast ID is, you can recover it by going to xfinity.com/username and entering your account number and the last name on the account. You will get a list of all usernames associated with your account.",
      },
      {
        type: 'heading',
        text: 'Do You Still Get a Free Email Address with Xfinity Internet?',
      },
      {
        type: 'paragraph',
        text: "Yes. Every Xfinity Internet account includes up to seven free @comcast.net email addresses. You can create additional email addresses for family members or for different purposes (like a dedicated address for online shopping). To create a new email address, sign in at xfinity.com, go to Account > Users, and select \"Add a New User.\" Each new user gets their own @comcast.net email and 10 GB of storage.",
      },
      {
        type: 'heading',
        text: 'What Happened to the Comcast.net Portal?',
      },
      {
        type: 'paragraph',
        text: "The old comcast.net homepage — with news, weather, and email — was phased out and replaced by the Xfinity Connect portal at connect.xfinity.com. It has the same email functionality plus a cleaner interface and better mobile support. Your emails, contacts, and calendar all carried over automatically. Nothing was lost in the transition.",
      },
      {
        type: 'heading',
        text: 'Common Email Issues and How to Fix Them',
      },
      {
        type: 'paragraph',
        text: "A few issues come up frequently with Comcast/Xfinity email:",
      },
      {
        type: 'list',
        items: [
          'Cannot sign in: Reset your password at xfinity.com/password. If that does not work, call (+1) 866-240-3377 and a support agent can help reset it.',
          'Email not loading on phone: Remove the email account from your phone settings and re-add it with the IMAP settings listed above. Make sure SSL/TLS is enabled.',
          'Missing emails: Check your spam and trash folders first. If emails are genuinely missing, Xfinity can run a trace — contact support with the date range and sender addresses.',
          'Storage full: Each email address has 10 GB of storage. If you are hitting the limit, delete old emails with large attachments or archive them to your computer using an email client.',
        ],
      },
      {
        type: 'callout',
        text: "Having trouble with your Comcast/Xfinity email? Call us at (+1) 866-240-3377 — we can help with password resets, email setup, and missing emails. Available 24/7.",
      },
      {
        type: 'paragraph',
        text: "The bottom line: nothing changed with your email. Comcast and Xfinity are the same company, your @comcast.net address works exactly as it always has, and you can access it through the web portal, the app, or any standard email client. The rebrand was just a name change — the service underneath is identical.",
      },
    ],
  },
  {
    id: 'easiest-way-to-cancel-xfinity',
    title: "What's the Easiest Way to Cancel Xfinity?",
    excerpt: 'Canceling Xfinity does not have to be a painful process. Here is the simplest, fastest way to do it — and a few things to watch out for.',
    category: 'Account & Billing',
    author: 'Nina Patel',
    authorRole: 'Consumer Guides Editor',
    date: 'August 12, 2026',
    readTime: '6 min read',
    avatarColor: 'from-amber-500 to-amber-700',
    content: [
      {
        type: 'paragraph',
        text: "Maybe you are moving, maybe you found a better deal, or maybe you are just done with Xfinity. Whatever the reason, canceling your service should not take hours of your life. The good news is that the process is simpler than most people think — you just need to know the right steps and what to expect.",
      },
      {
        type: 'heading',
        text: 'Method 1: Call the Cancellation Line (Fastest)',
      },
      {
        type: 'paragraph',
        text: "The fastest way to cancel is by phone. Call (+1) 866-240-3377 and tell the automated system you want to cancel your service. You will be connected to a retention agent whose job is to try to keep you as a customer. Be polite but firm — if you have made up your mind, simply say \"I am canceling my service today\" and do not engage with retention offers unless you genuinely want to hear them.",
      },
      {
        type: 'numbered',
        items: [
          'Call (+1) 866-240-3377 and say \"cancel service\" to the automated system.',
          'Have your account number ready — it is on your bill or in the Xfinity app under Account.',
          'Tell the agent you want to cancel and give a date for the cancellation to take effect.',
          'If they offer a retention deal and you are not interested, politely decline and repeat that you want to cancel.',
          'Ask for a confirmation number and the email address where your final bill and confirmation will be sent.',
          'Write down the confirmation number, the agent name, and the cancellation date.',
        ],
      },
      {
        type: 'callout',
        text: "Expect the call to take 10–20 minutes. The agent is required to offer you at least one retention deal before processing the cancellation — this is standard and not something you can skip.",
      },
      {
        type: 'heading',
        text: 'Method 2: Cancel via the Xfinity App',
      },
      {
        type: 'paragraph',
        text: "You can also start the cancellation process through the Xfinity app. Open the app, go to Account > Manage Plan, and look for the option to cancel or disconnect service. This will route you to a chat agent who can process the cancellation. It is not as fast as calling, but it works if you prefer not to talk on the phone.",
      },
      {
        type: 'heading',
        text: 'Method 3: Visit an Xfinity Store',
      },
      {
        type: 'paragraph',
        text: "If you have rented equipment (Gateway, TV boxes, remotes), going to an Xfinity Store is actually the smartest option because you can return the equipment at the same time and get a receipt proving you returned it. Use the Xfinity Store Locator at xfinity.com/storelocator to find the nearest location. Bring your equipment and a photo ID. The store agent can process the cancellation and equipment return in one visit.",
      },
      {
        type: 'heading',
        text: 'What About Equipment Returns?',
      },
      {
        type: 'paragraph',
        text: "This is where most people run into trouble. If you have rented equipment from Xfinity, you must return it within a specific timeframe — usually 14 days after cancellation — or you will be charged an unreturned equipment fee (which can be $100–$300 per device). Here are your return options:",
      },
      {
        type: 'list',
        items: [
          'Drop off at an Xfinity Store (recommended — get a receipt on the spot).',
          'Use a UPS Store — Xfinity has a partnership with UPS, so you can drop off equipment at any UPS location for free. No box needed; UPS will pack and ship it.',
          'Request a prepaid return kit by mail — Xfinity will send a box with a prepaid label. This takes 3–5 business days to arrive and you have to pack it yourself.',
        ],
      },
      {
        type: 'callout',
        text: "Always get a receipt for equipment returns, no matter which method you use. Without proof of return, you could be charged even if Xfinity received the equipment.",
      },
      {
        type: 'heading',
        text: 'Watch Out for These Common Pitfalls',
      },
      {
        type: 'paragraph',
        text: "A few things can make cancellation more painful than it needs to be:",
      },
      {
        type: 'list',
        items: [
          'Early termination fees: If you are under a contract, you may be charged an ETF (typically $10 per month remaining on your contract). Ask the agent exactly how much yours would be before confirming.',
          'Final bill surprises: Your final bill may include partial-month charges, equipment fees, or prorated credits. Review it carefully and call back if anything looks wrong.',
          'Auto-pay: Turn off auto-pay before your cancellation date so you are not charged after canceling. Go to Billing > Auto-Pay in the Xfinity app.',
          'Email access: If your email is tied to your Xfinity account, ask the agent what happens to it. In most cases, you can keep your @comcast.net email address even after canceling internet service, but you need to specifically request this.',
        ],
      },
      {
        type: 'heading',
        text: 'Should You Try to Negotiate Instead of Canceling?',
      },
      {
        type: 'paragraph',
        text: "If you are canceling because of price, it is worth knowing that Xfinity often offers significant discounts to customers who threaten to leave. The retention agent on the phone is authorized to offer lower monthly rates, free premium channels, or bill credits. If you are open to staying at a lower price, hear them out — you might save $20–$50 per month without changing providers.",
      },
      {
        type: 'quote',
        text: "\"I called to cancel and ended up staying because they offered me the same plan for $35 less per month for 12 months. Always worth asking.\" — Jennifer L., Seattle, WA",
      },
      {
        type: 'callout',
        text: "Ready to cancel or want to negotiate a better deal? Call (+1) 866-240-3377 to speak with a representative. Available 24/7.",
      },
      {
        type: 'paragraph',
        text: "Canceling Xfinity is straightforward if you are prepared. Call the number, be firm, return your equipment with proof, and review your final bill. If price is your main concern, it never hurts to ask for a retention deal first — you might be surprised at what they offer to keep you.",
      },
    ],
  },
  {
    id: 'xfinity-escalate-guide',
    title: 'Xfinity Escalate Guide: The Complete Reference',
    excerpt: 'A comprehensive, no-fluff reference covering every escalation channel available to Xfinity customers — from internal support to external regulators.',
    category: 'Customer Support',
    author: 'Rachel Donovan',
    authorRole: 'Consumer Advocacy Writer',
    date: 'August 10, 2026',
    readTime: '10 min read',
    avatarColor: 'from-teal-500 to-teal-700',
    content: [
      {
        type: 'paragraph',
        text: "This is the complete escalation reference for Xfinity customers. If you have a problem that standard support has not resolved, this guide covers every channel available to you — ranked by effectiveness and speed. Bookmark this page so you have it when you need it.",
      },
      {
        type: 'heading',
        text: 'Level 1: Standard Support',
      },
      {
        type: 'paragraph',
        text: "Before escalating, make sure you have genuinely exhausted standard support. Many issues are resolved at this level if you communicate clearly.",
      },
      {
        type: 'list',
        items: [
          'Xfinity Assistant chat: Available 24/7 in the Xfinity app and on xfinity.com. Good for billing questions, modem restarts, and basic troubleshooting.',
          'Phone support: Call (+1) 866-240-3377. Say \"representative\" to skip the menu. Best for complex issues that require a human.',
          'Xfinity app self-service: Many issues (equipment restart, billing changes, channel management) can be handled directly in the app without calling.',
          'Community forums: forums.xfinity.com has active community members and some official Xfinity moderators who can help with unusual issues.',
        ],
      },
      {
        type: 'heading',
        text: 'Level 2: Supervisor and Advanced Support',
      },
      {
        type: 'paragraph',
        text: "If the front-line agent cannot resolve your issue, ask to be transferred to a supervisor. Supervisors have more authority and access to advanced diagnostic tools. Be specific about what you need — \"I need a technician scheduled this week\" or \"I need a credit for the days my service was down.\" Vague requests get vague responses.",
      },
      {
        type: 'numbered',
        items: [
          'Ask the front-line agent: \"Can I please speak with your supervisor?\"',
          'If the supervisor is unavailable, ask for a callback within 24 hours.',
          'Explain your issue from scratch (do not assume the agent passed along your details).',
          'State the specific resolution you want.',
          'Get the supervisor name and a ticket number before ending the call.',
        ],
      },
      {
        type: 'heading',
        text: 'Level 3: Retention / Loyalty Department',
      },
      {
        type: 'paragraph',
        text: "The retention department is Xfinity's most empowered escalation tier. These agents have authority to offer credits, waive fees, provide free service months, expedite technician visits, and in some cases, change your plan pricing. Ask to be transferred to retention by saying \"I am considering canceling and would like to speak with the retention department.\" You do not have to actually cancel — just expressing the intent gets you transferred.",
      },
      {
        type: 'callout',
        text: "Retention agents are evaluated on their ability to keep customers. This means they are motivated to solve your problem. Use this to your advantage — clearly state what it would take for you to stay satisfied.",
      },
      {
        type: 'heading',
        text: 'Level 4: Executive Customer Care',
      },
      {
        type: 'paragraph',
        text: "If internal support has failed, Xfinity has an Executive Customer Care team that handles high-priority complaints. This team operates above the standard support hierarchy and has broader resolution authority. You can reach them through these channels:",
      },
      {
        type: 'list',
        items: [
          'Email the executive team at We_Can_Help@cable.comcast.com — include your account number, a summary of your issue, and what you have already tried. Expect a response within 2–3 business days.',
          'Contact Comcast Corporate Headquarters at 1-215-286-1700 and ask to be connected to Executive Customer Care.',
          "Reach out to Tom Karinshak, Comcast's Chief Customer Officer, through LinkedIn or executive contact directories. This is a last resort but has been known to work.",
        ],
      },
      {
        type: 'heading',
        text: 'Level 5: External Complaint Channels',
      },
      {
        type: 'paragraph',
        text: "When internal escalation is not enough, external regulatory and consumer protection channels can apply pressure that Xfinity cannot ignore. These are listed in order of typical effectiveness:",
      },
      {
        type: 'heading',
        text: 'FCC Complaint',
      },
      {
        type: 'paragraph',
        text: "Filing with the FCC is the single most effective external escalation method. Comcast is legally required to respond to every FCC complaint within 30 days, and unresolved complaints are tracked publicly. Go to consumercomplaints.fcc.gov, select \"Internet,\" and file your complaint. Be detailed and factual. You will receive a response from Comcast's government affairs team — which is a higher-tier department than standard customer service.",
      },
      {
        type: 'heading',
        text: 'BBB Complaint',
      },
      {
        type: 'paragraph',
        text: "The Better Business Bureau forwards complaints to Comcast and tracks the company response. File at bbb.org. Comcast has a dedicated BBB response team that typically replies within 3–5 business days. While the BBB does not have regulatory power, companies care about their BBB rating because consumers check it.",
      },
      {
        type: 'heading',
        text: 'State Attorney General',
      },
      {
        type: 'paragraph',
        text: "Your state Attorney General's office has a consumer protection division that handles telecom complaints. This is particularly effective for billing disputes, unauthorized charges, and contract violations. Search for \"[your state] attorney general consumer complaint\" to find the filing process for your state. The AG office can mediate directly with Comcast and in some cases take legal action.",
      },
      {
        type: 'heading',
        text: 'Social Media',
      },
      {
        type: 'paragraph',
        text: "Public complaints on social media get fast responses because they are visible to other customers. Use these channels strategically:",
      },
      {
        type: 'list',
        items: [
          'Twitter/X: Tweet at @Xfinity and @ComcastCares with a brief description (no personal info). Response time is usually within a few hours.',
          'Reddit: Post on r/Comcast_Xfinity — official Xfinity employees moderate and respond.',
          'Facebook: Post on the Xfinity Facebook page. The social media team monitors and responds.',
        ],
      },
      {
        type: 'heading',
        text: 'Escalation Checklist: What to Have Ready',
      },
      {
        type: 'paragraph',
        text: "No matter which level you are escalating to, having this information ready will save you time and make your case stronger:",
      },
      {
        type: 'numbered',
        items: [
          'Account number (found on your bill or in the Xfinity app).',
          'Primary phone number on the account.',
          'Service address.',
          'Date the issue started and a brief timeline of what happened.',
          'List of contacts you have already made (dates, agent names, ticket numbers).',
          'Specific resolution you are requesting (credit amount, technician visit, plan change, etc.).',
          'Any supporting evidence (screenshots, speed tests, billing statements, emails).',
        ],
      },
      {
        type: 'callout',
        text: "Need to escalate right now? Start by calling (+1) 866-240-3377 and asking for a supervisor. If that does not resolve it, use the external channels above. Our team is available 24/7.",
      },
      {
        type: 'heading',
        text: 'How Long Should Escalation Take?',
      },
      {
        type: 'paragraph',
        text: "Here are realistic timelines for each escalation level:",
      },
      {
        type: 'list',
        items: [
          'Standard support: Same call or within 24 hours.',
          'Supervisor: Within 24–48 hours (often same call).',
          'Retention: Same call (you are connected immediately).',
          'Executive Customer Care: 2–5 business days.',
          'FCC complaint: Comcast must respond within 30 days, but typically responds within 7–14 days.',
          'BBB complaint: 3–5 business days for initial response.',
          'State AG: 2–4 weeks depending on the state.',
        ],
      },
      {
        type: 'paragraph',
        text: "The key to successful escalation is persistence combined with documentation. Every time you contact Xfinity, add to your case log. When you use external channels, reference your case log and ticket numbers. The more organized and specific you are, the faster your issue gets resolved. And always start with the phone call — (+1) 866-240-3377 — because most issues can be resolved without ever needing to go to external channels.",
      },
    ],
  },
];

