export default (plugin) => {
  plugin.services['image-manipulation'].generateResponsiveFormats = async () => {
    return [];
  };

  return plugin;
};
