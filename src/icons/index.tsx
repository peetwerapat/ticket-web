import * as AllIcons from "../../public/icons";

const iconNames = { ...AllIcons };

type IconProps = {
  name: keyof typeof iconNames;
} & React.SVGProps<SVGSVGElement>;

const Icons: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgIcon = iconNames[name];
  if (!SvgIcon) return null;
  return <SvgIcon className="w-[1.5rem]" {...props} />;
};

export { iconNames, Icons };
