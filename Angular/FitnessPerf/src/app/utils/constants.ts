import { environment } from 'src/environments/environment';

export class Constants {
  public static USER_DATA: string = environment.USER_DATA;
  public static USER_EXERCISES: string = 'user_exercises';
  public static USER_PROGRAMS: string = 'user_programs';
  public static USER_WEIGHT: string = 'user_weight';
  public static PROGRAM_PREFIX: string = 'Programme ';

  public static FIREBASE_DELAY: number = environment.delayFirebase;
  public static MAX_PREFETCH: number = 10;

  public static CHECK_MARK: string = '✔';
  public static CROSS_MARK: string = '✖';
  public static PLUS_MARK: string = '✚';
}
