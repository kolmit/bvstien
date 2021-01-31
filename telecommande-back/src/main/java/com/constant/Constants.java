package com.constant;

public class Constants {

    public static final String CMD_SHUTDOWN = "shutdown -s -f -t";
    public static final String CMD_CANCEL_SHUTDOWN = "shutdown -a";

    public static final String PATH_CHROME = "\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome\"";
    public static final String CMD_CHROME = Constants.PATH_CHROME + " -fullscreen";
    public static final String CMD_KILL_CHROME = "taskkill /F /IM chrome* /T";

    public static final String CMD_VOLUME_SET_DEVICE = "nircmd setdefaultsounddevice";
    public static final String CMD_VOLUME_MUTE = "nircmd mutesysvolume";
    public static final String CMD_VOLUME_CHANGE = "nircmd changesysvolume";


    public static String getCommand(String... commandConstantAndParameter) {
        StringBuilder str = new StringBuilder();

        for (String cmd : commandConstantAndParameter){
            str = str.append(cmd);
            str = str.append(" ");
        }

        return str.toString().trim();
    }
}
