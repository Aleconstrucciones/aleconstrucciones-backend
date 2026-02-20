export default (plugin) => {
    plugin.services['image-manipulation'].generateResponsiveFormats = async () => {
        return [];
    };

    plugin.services['image-manipulation'].generateThumbnail = async () => {
        return null;
    };

    return plugin;
};
