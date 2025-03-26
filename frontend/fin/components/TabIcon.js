import homeIcon from '../assets/icons/home.svg';
import transactionsIcon from '../assets/icons/transactions.svg';
import optionsIcon from '../assets/icons/options.svg';
import finIcon from '../assets/icons/fin.svg';

const iconMap = {
    home: homeIcon,
    transactions: transactionsIcon,
    settings: optionsIcon,
    fin: finIcon,
};

export default function TabIcon({ name, size = 24, color = '#000' }) {
  const source = iconMap[name];

  if (!source) {
    console.warn(`Unknown icon name: ${name}`);
    return null;
  }

  const IconComponent = iconMap[name];

  return <IconComponent width={size} height={size} fill={color} />;
}
